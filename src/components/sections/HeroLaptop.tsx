"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * THE LAPTOP — the one 3D object on the page, a real glTF model rendered in
 * WebGL rather than the CSS-transform prism it replaces. Everything the prism
 * did behaviourally is preserved (idle motion, pointer response, scroll
 * response, reduced-motion respect, off-screen freeze); only the renderer and
 * the subject changed.
 *
 * WHY THE WHOLE THING IS LAZY. three.js is ~600KB of JavaScript and the model
 * is 1.7MB. Neither is in the page bundle: `three`, `GLTFLoader` and
 * `RoomEnvironment` are dynamically imported inside the effect, so they are
 * fetched only once this component has decided it is actually going to draw
 * something. That decision happens BEFORE any of the fetching:
 *
 *   - below MIN_WIDTH the scene is skipped outright and nothing is
 *     downloaded at all. The old prism was `hidden sm:block`, which looked
 *     the same, but a hidden <canvas> would still have paid for the model.
 *     Hosting here is a static export on Firebase's free tier, where 2.3MB
 *     of decoration per phone visit is a real cost, not a rounding error.
 *   - if WebGL context creation throws, the effect bails silently and the
 *     hero is simply a hero with no object in it. Nothing else depends on it.
 *
 * WHY NO react-three-fiber. Nothing in this scene is React state — no
 * component re-renders per frame, no props flow into the graph. Fiber's
 * reconciler would be ~200KB to express a single loaded model and a
 * rotation, and the surrounding code (HeroPrism before it, the Hero carousel)
 * is already written imperatively with refs and rAF. This matches it.
 *
 * WHY THE MODEL IS NOT MOVED, ONLY ITS PARENTS. Three nested objects, each
 * with exactly one job, because collapsing them breaks the rotation:
 *   model  → recentred on its own bounding box and normalised to one world
 *            unit, so the pivot spins it about its middle rather than
 *            swinging it around an arbitrary export origin
 *   pivot  → every rotation (idle, pointer, scroll) is summed onto this
 *   anchor → screen-space placement and scale, recomputed on resize
 *
 * WHY IT IS MASKED OFF THE COPY. It is a background, so it is full-bleed
 * across the section rather than parked in the figure column — but the
 * headline is not the only text it would then sit behind, and the muted body
 * copy measurably fails contrast over it. MASK below carries the numbers.
 *
 * Decorative and redundant with the visible copy beside it, so the whole
 * thing is `aria-hidden`. It is not inert, though: on a fine pointer the
 * host takes pointer events so the object can be grabbed and turned. It sits
 * behind the slide content in paint order, so the copy, the buttons and the
 * carousel controls all hit first and keep working untouched.
 */

/** Below this the scene never initialises and nothing is downloaded.
 *
 *  This is the `lg` breakpoint, not `sm`, and the reason is the mask below
 *  rather than bandwidth. From `lg` up the hero is two columns with the copy
 *  reliably on the left, which is what makes a left-to-right mask the right
 *  shape. Below it the hero stacks — figure above, copy beneath — and a
 *  horizontal fade would be masking the wrong axis, leaving the model behind
 *  body copy with no way to keep it legible. */
const MIN_WIDTH = 1024;

const FOV = 35;
const CAM_DIST = 9;

/** Where the object sits in the hero, as a fraction of the canvas box.
 *
 *  Biased right of centre but NOT parked inside the figure column, which is
 *  where the prism used to sit. Both slides already put a drawn figure there,
 *  and slide two's is a grid of opaque cards: a solid object behind those
 *  gets sliced into fragments by boxes that are themselves invisible against
 *  the white sheet, which reads as a rendering bug rather than as depth.
 *  Straddling the gutter instead means most of the object falls on open
 *  sheet, and OPACITY below keeps whatever does pass behind the cards
 *  reading as a background wash rather than as a cut-up solid. */
const FOCUS_X_WIDE = 0.53;
const FOCUS_Y = 0.42;
/** Aspect above which the hero is still laid out as two columns. */
const WIDE_ASPECT = 1.4;
/** How large the object is drawn, as a fraction of the canvas box. Width and
 *  height are BOTH constraints and the smaller wins: sizing off width alone
 *  looks right at one aspect and then punches the laptop through the top of
 *  a short, wide hero. The height budget is the tighter of the two because
 *  the object is spinning — what has to fit is the sphere it sweeps, not the
 *  silhouette it happens to present at rest. */
const SPAN_WIDE = 0.4;
const SPAN_NARROW = 0.48;
const SPAN_HEIGHT = 0.78;

/** Resting tilt, in radians. Negative pitch looks slightly DOWN at the
 *  object, which is how a laptop reads as a thing on a desk rather than a
 *  flat panel. The idle spin is added to yaw on top of this. */
const BASE_PITCH = -0.16;
/** Radians per second of never-stopping idle rotation — a full turn every
 *  ~29s. Slow enough to read as ambient rather than as a spinning logo. */
const IDLE_SPEED = 0.22;
/** Opening angle, in radians. Yaw 0 is the laptop dead-on; a little under a
 *  quarter turn off it is the three-quarter view that reads as an object
 *  rather than an elevation drawing. The idle spin starts from here. */
const REST_YAW = -0.6;

/** Radians of rotation per pixel dragged. A ~300px sweep turns the object
 *  about a third of a revolution, which is enough to feel direct without
 *  making the thing skittish. */
const DRAG_SPEED = 0.006;
/** Pitch is clamped; yaw is not. Yaw is a spin and any angle is a legitimate
 *  view of a laptop, but past roughly a quarter turn of pitch the object is
 *  being looked at from underneath and reads as broken rather than as
 *  rotated. */
const PITCH_LIMIT = 0.5;
/** Exponential approach rate toward the pointer target. Applied as
 *  1 - e^(-DAMP·dt) so the easing is identical at 60Hz and 144Hz instead of
 *  running twice as fast on a high-refresh display. */
const DAMP = 4.5;

/** Extra yaw swung across the hero's full scroll travel, additive on top of
 *  idle + pointer — the same interaction the prism had, kept so scrolling
 *  the first screen still moves the object. */
const SCROLL_YAW = 1.9;

/** Held back from full strength: this sits behind both slides' figures, and
 *  at full opacity a solid object competes with them instead of sitting
 *  under them. Opacity alone cannot make it safe behind TEXT, though — see
 *  MASK. */
const OPACITY = 0.32;

/** The model is masked off the copy column entirely, and this is a
 *  measured requirement rather than a preference.
 *
 *  `--ink-muted` (#6e6e6e) on the white sheet is 5.10:1. Over the laptop's
 *  screen panel it measured 2.14:1 — under the 4.5:1 AA floor, so the body
 *  copy and the eyebrow stop being legible wherever the model passes behind
 *  them. Turning the opacity down does not rescue it: the screen panel is
 *  near-black, and the arithmetic needs roughly 7% opacity before muted grey
 *  clears AA again, which is the same as not drawing the model at all. The
 *  headline is fine either way (#000 measured 8.83:1), but it is not the
 *  only text in the column.
 *
 *  So the model is faded out across the copy and brought to full strength
 *  only past it. The 33% start is not arbitrary: the muted body copy ends at
 *  ~33% of the hero's width on both slides, and measurement showed 4.39:1 —
 *  a fail — when the fade began at 30% and let a little of the object under
 *  that column. It has to be clear where the text ends, not near it. Soft, because a hard edge would read as the object being
 *  cut rather than lit.
 *
 *  KNOWN GAP: the mask protects the copy column, not the figure column's own
 *  captions. Those are `--ink-faint` (#767676), which is 4.54:1 on the bare
 *  sheet — already within a hair of the AA floor, so ANY backdrop at all
 *  puts them under it, at any opacity. Nothing can be tuned here to fix
 *  that; it needs either the model kept clear of that column too (there is
 *  no room left in this hero) or those captions darkened a step. */
const MASK = "linear-gradient(to right, transparent 33%, black 52%)";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export function HeroLaptop() {
  const reduce = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const section = host?.closest("section");
    if (!host || !section) return;
    if (!window.matchMedia(`(min-width: ${MIN_WIDTH}px)`).matches) return;

    let disposed = false;
    let cleanup = () => {};

    void (async () => {
      let THREE: typeof import("three");
      let GLTFLoader: (typeof import("three/examples/jsm/loaders/GLTFLoader.js"))["GLTFLoader"];
      let RoomEnvironment: (typeof import("three/examples/jsm/environments/RoomEnvironment.js"))["RoomEnvironment"];

      try {
        const [three, loaders, environments] = await Promise.all([
          import("three"),
          import("three/examples/jsm/loaders/GLTFLoader.js"),
          import("three/examples/jsm/environments/RoomEnvironment.js"),
        ]);
        THREE = three;
        GLTFLoader = loaders.GLTFLoader;
        RoomEnvironment = environments.RoomEnvironment;
      } catch {
        return; // Chunk failed to load; the hero is fine without an object.
      }
      if (disposed) return;

      /* Ask for a context ourselves before handing the job to three.
         three's constructor does not fail quietly: when no context can be
         had it console.errors ("A WebGL context could not be created",
         then "Error creating WebGL context") and only then throws. Catching
         the throw keeps the page working but does nothing about the logs,
         and Next's dev overlay surfaces console.error as an error attributed
         to the app frame that called in — i.e. this line — so a machine
         whose GPU process has crashed or whose driver reset gets a stack of
         red overlay errors pointing at code that is behaving correctly.
         Probing first means three is only ever constructed when it will
         succeed. The probe context is released immediately: live contexts
         are a capped, document-wide resource (~16 in Chrome). */
      try {
        const probe = document.createElement("canvas");
        const probeGl =
          probe.getContext("webgl2") ?? probe.getContext("webgl");
        if (!probeGl) return;
        probeGl.getExtension("WEBGL_lose_context")?.loseContext();
      } catch {
        return;
      }

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });
      } catch {
        return; // No WebGL (blocked, blacklisted driver, out of contexts).
      }

      renderer.setClearAlpha(0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      const canvas = renderer.domElement;
      canvas.style.cssText = "display:block;width:100%;height:100%";
      host.appendChild(canvas);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
      camera.position.set(0, 0, CAM_DIST);

      /* The model carries no textures — twelve plain PBR materials, one of
         them transmissive glass — so an environment map is doing all of the
         work of making a black object legible against a white sheet.
         RoomEnvironment is generated procedurally at runtime rather than
         fetched: an .hdr would be another network asset on a static export,
         and what this needs is reflections, not a specific place. */
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04);
      scene.environment = envMap.texture;

      const key = new THREE.DirectionalLight(0xffffff, 2.1);
      key.position.set(2.5, 3, 4);
      scene.add(key);

      /* Rim light in `--spec-4`, the same violet the spectrum ramp uses
         everywhere else on the site, so the object is lit by the design
         system rather than by an arbitrary blue. */
      const rim = new THREE.DirectionalLight(0x947be1, 1.0);
      rim.position.set(-3.5, 1.2, -2.5);
      scene.add(rim);

      const anchor = new THREE.Group();
      const pivot = new THREE.Group();
      anchor.add(pivot);
      scene.add(anchor);

      let loaded = false;
      let inView = true;
      let raf = 0;
      let last = performance.now();

      const spin = { idle: REST_YAW, scroll: 0 };
      const pointer = { yaw: 0, pitch: 0, targetYaw: 0, targetPitch: 0 };

      let contextLost = false;

      const draw = () => {
        // A lost context makes every GL call an error. three stops rendering
        // on its own once its listener fires, but the loss happens before
        // the event is dispatched, so the loop has to check too — otherwise
        // one dropped context becomes a stream of errors from this line.
        if (contextLost) return;
        pivot.rotation.y = spin.idle + spin.scroll + pointer.yaw;
        pivot.rotation.x = BASE_PITCH + pointer.pitch;
        renderer.render(scene, camera);
      };

      const layout = () => {
        const w = host.clientWidth;
        const h = host.clientHeight;
        if (w === 0 || h === 0) return;

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();

        /* Convert the canvas box into world units at the model's depth, so
           placement and size are expressed as fractions of what is actually
           visible rather than as magic constants that only hold at one
           viewport size. */
        const visibleH = 2 * Math.tan((FOV * Math.PI) / 180 / 2) * CAM_DIST;
        const visibleW = visibleH * camera.aspect;
        const wide = camera.aspect > WIDE_ASPECT;

        anchor.position.x = visibleW * ((wide ? FOCUS_X_WIDE : 0.5) - 0.5);
        anchor.position.y = visibleH * (0.5 - FOCUS_Y);
        anchor.scale.setScalar(
          Math.min(visibleW * (wide ? SPAN_WIDE : SPAN_NARROW), visibleH * SPAN_HEIGHT),
        );

        if (loaded) draw();
      };

      const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        if (!inView || !loaded) return;

        spin.idle += IDLE_SPEED * dt;
        const k = 1 - Math.exp(-DAMP * dt);
        pointer.yaw += (pointer.targetYaw - pointer.yaw) * k;
        pointer.pitch += (pointer.targetPitch - pointer.pitch) * k;
        draw();
      };

      /* A context can be dropped for reasons that have nothing to do with
         this page — the GPU process crashing, the driver resetting, or the
         browser reclaiming the oldest context because some other tab wanted
         one. preventDefault() is what makes it recoverable: without it the
         browser will not restore the context at all. */
      const onContextLost = (event: Event) => {
        event.preventDefault();
        contextLost = true;
        cancelAnimationFrame(raf);
      };
      const onContextRestored = () => {
        contextLost = false;
        last = performance.now();
        layout();
        if (!reduce && loaded) raf = requestAnimationFrame(frame);
      };
      canvas.addEventListener("webglcontextlost", onContextLost);
      canvas.addEventListener("webglcontextrestored", onContextRestored);

      /* Freeze everything the moment the hero leaves the viewport: no frames
         drawn, no scroll or pointer maths done. This is the first section on
         the page, so it spends most of a session off-screen. */
      const io = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting;
          // Reset the frame clock, so a long spell off-screen does not come
          // back as one enormous dt and a visible jump in the idle spin.
          last = performance.now();
        },
        { threshold: 0 },
      );
      io.observe(section);

      const resizeObserver = new ResizeObserver(layout);
      resizeObserver.observe(host);

      let scrollFrame = 0;
      const onScroll = () => {
        cancelAnimationFrame(scrollFrame);
        scrollFrame = requestAnimationFrame(() => {
          if (!inView) return;
          const rect = section.getBoundingClientRect();
          // `-rect.top / rect.height`, not a formula symmetric about the
          // viewport centre: the hero is the first thing on the page, so
          // rect.top is never positive and a symmetric mapping would only
          // ever use half of its own range.
          spin.scroll = clamp(-rect.top / rect.height, 0, 1) * SCROLL_YAW;
        });
      };

      /* GRAB AND TURN, not follow-the-cursor. Mapping rotation to mere
         pointer position means the object reacts to every stray movement
         across the hero — the user is never not "controlling" it, which is
         exactly what makes it feel twitchy. A drag has a beginning and an
         end, so the object is still while the cursor is merely passing over
         it, and moves only when someone means it to.
   
         Signs are direct manipulation: the grabbed face goes where the hand
         goes. rotateY(+) swings the front to the right, and rotateX(+) tips
         the front down, so both deltas map straight across with no negation.
   
         The angle is KEPT on release rather than sprung back to the idle
         pose. Snapping back would undo the user's action in front of them;
         the idle spin simply carries on from wherever they left it. */
      let dragging = false;
      let lastX = 0;
      let lastY = 0;

      /* Listening on the SECTION, not on the host. The host is painted behind
         the slide content, so a press that lands on the headline or the
         figure never reaches it — which meant the drag only started on bare
         sheet, and pressing anywhere else began a text selection and smeared
         a highlight across the copy instead. Events bubble up from the host,
         so the section catches both cases with one listener.

         Interactive descendants are excluded rather than special-cased: the
         CTAs, the carousel arrows and the slide dots all live inside this
         section and must keep behaving like controls. */
      const onPointerDown = (e: PointerEvent) => {
        if (e.button !== 0) return;
        const target = e.target as Element | null;
        if (target?.closest('a, button, input, textarea, select, [role="button"]')) return;

        // Suppresses the text selection the press would otherwise begin.
        e.preventDefault();
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        section.setPointerCapture(e.pointerId);
        (section as HTMLElement).style.cursor = "grabbing";
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!dragging) return;
        pointer.targetYaw += (e.clientX - lastX) * DRAG_SPEED;
        pointer.targetPitch = clamp(
          pointer.targetPitch + (e.clientY - lastY) * DRAG_SPEED,
          -PITCH_LIMIT,
          PITCH_LIMIT,
        );
        lastX = e.clientX;
        lastY = e.clientY;
      };

      const endDrag = (e: PointerEvent) => {
        if (!dragging) return;
        dragging = false;
        if (section.hasPointerCapture(e.pointerId)) section.releasePointerCapture(e.pointerId);
        (section as HTMLElement).style.cursor = "";
      };

      /* Touch is deliberately excluded. The host spans the whole section, so
         claiming drags on a touchscreen would eat the page scroll over the
         first viewport. MIN_WIDTH already keeps phones out; this covers the
         large touchscreen that gets through. */
      const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

      cleanup = () => {
        cancelAnimationFrame(raf);
        cancelAnimationFrame(scrollFrame);
        io.disconnect();
        resizeObserver.disconnect();
        window.removeEventListener("scroll", onScroll);
        section.removeEventListener("pointerdown", onPointerDown);
        section.removeEventListener("pointermove", onPointerMove);
        section.removeEventListener("pointerup", endDrag);
        section.removeEventListener("pointercancel", endDrag);
        host.style.pointerEvents = "";
        host.style.cursor = "";
        (section as HTMLElement).style.cursor = "";
        canvas.removeEventListener("webglcontextlost", onContextLost);
        canvas.removeEventListener("webglcontextrestored", onContextRestored);

        scene.traverse((object) => {
          const mesh = object as import("three").Mesh;
          if (!mesh.isMesh) return;
          mesh.geometry?.dispose();
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          for (const material of materials) material?.dispose();
        });
        envMap.dispose();
        pmrem.dispose();
        renderer.dispose();

        /* dispose() frees three's own caches and unhooks its listeners, but
           it does NOT release the WebGL context — WEBGL_lose_context is the
           only thing that does, which is what forceContextLoss() calls. That
           distinction is the whole bug this guards against: a document may
           only hold so many live contexts (~16 in Chrome), and in dev this
           effect is torn down and rebuilt constantly — StrictMode mounts
           every component twice, and every Fast Refresh of this file remounts
           it again. Without the line below each of those strands a context
           that nothing will ever reclaim, and after a dozen edits
           `new WebGLRenderer()` starts throwing "Error creating WebGL
           context" while the browser drops the oldest contexts underneath
           whatever is still drawing. */
        renderer.forceContextLoss();
        canvas.remove();
      };

      // Unmounted while the chunks were still in flight: tear down what was
      // built above rather than leaking a live WebGL context.
      if (disposed) {
        cleanup();
        return;
      }

      layout();

      new GLTFLoader().load(
        "/laptop_model_black.glb",
        (gltf) => {
          if (disposed) return;
          const model = gltf.scene;

          const box = new THREE.Box3().setFromObject(model);
          const size = box.getSize(new THREE.Vector3());
          const centre = box.getCenter(new THREE.Vector3());

          /* The recentring offset and the fit scale MUST live on different
             nodes. An Object3D's own scale does not apply to its own
             position, so doing both here would leave the -centre offset at
             full model units while the geometry shrank around it — which
             throws the object clean out of frame rather than centring it.
             `fit` scales; `model` only translates, inside that scale. */
          model.position.sub(centre);
          const fit = new THREE.Group();
          fit.scale.setScalar(1 / Math.max(size.x, size.y, size.z));
          fit.add(model);

          pivot.add(fit);
          loaded = true;
          layout();

          if (reduce) {
            // Reduced motion still gets the object, just held still: one
            // frame at a three-quarter angle, no loop, no listeners.
            spin.idle = REST_YAW;
            draw();
          } else {
            window.addEventListener("scroll", onScroll, { passive: true });
            onScroll();
            if (hasFinePointer) {
              /* The host sits BEHIND the slide content in paint order, so
                 turning pointer events back on here does not shadow the
                 headline, the buttons or the carousel controls — those hit
                 first. Only a press that lands on open sheet reaches the
                 object. */
              // The host still takes pointer events purely for the affordance:
              // over open sheet, where the object actually is, the cursor
              // reads "grab". Over the copy it stays a text caret, because
              // the copy is on top and unchanged.
              host.style.pointerEvents = "auto";
              host.style.cursor = "grab";
              section.addEventListener("pointerdown", onPointerDown);
              section.addEventListener("pointermove", onPointerMove);
              section.addEventListener("pointerup", endDrag);
              section.addEventListener("pointercancel", endDrag);
            }
            raf = requestAnimationFrame(frame);
          }

          // Faded in rather than popped in: the model arrives well after the
          // hero's own entrance keyframes have finished.
          host.style.opacity = String(OPACITY);
        },
        undefined,
        () => {
          /* Model failed to load; leave the host empty and transparent. */
        },
      );
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [reduce]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-(--ease-settle)"
      style={{ maskImage: MASK, WebkitMaskImage: MASK }}
    />
  );
}
