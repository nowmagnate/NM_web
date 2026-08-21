import { cn } from "@/lib/cn";

/**
 * Form controls as square, bordered fields. Rest state is a 1px hairline;
 * focus swaps it to a solid 2px ink ring, which is the whole affordance —
 * nothing here uses a fill or a shadow to signal state.
 *
 * Non-negotiables baked in here so no individual form can get them wrong:
 *  - The label sits ABOVE the input and is always present.
 *  - A placeholder is never the label; it vanishes on first keystroke and is
 *    invisible to most screen readers.
 *  - The helper/error slot is always rendered, so revealing an error does not
 *    shift everything below it.
 *  - Errors are announced (role="alert") and tied to the control by id, not
 *    just coloured.
 *
 * Contrast: helper text uses --ink-muted, not --ink-faint. The faint token is
 * reserved for marks and rules and does not clear AA at body sizes.
 */

export function Label({
  htmlFor,
  children,
  required,
  className,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("ui-label text-ink-soft text-[11px]", className)}
    >
      {children}
      {required ? (
        <>
          <span aria-hidden="true" className="text-danger ml-1">
            *
          </span>
          <span className="sr-only"> (required)</span>
        </>
      ) : null}
    </label>
  );
}

const control =
  "w-full border border-rule-strong bg-bg px-3.5 py-2.5 text-[15px] text-ink " +
  "placeholder:text-ink-muted/70 " +
  "transition-[outline-color] duration-[--t-fast] ease-out " +
  "focus:outline-2 focus:-outline-offset-1 focus:outline-ink " +
  "disabled:cursor-not-allowed disabled:opacity-50";

function controlClasses(invalid?: boolean, className?: string) {
  return cn(control, invalid && "outline-2 outline-offset-0 outline-danger", className);
}

export function Field({
  id,
  label,
  helper,
  error,
  required,
  children,
  className,
}: {
  id: string;
  label: string;
  helper?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>

      {children}

      <div className="min-h-[1.25rem]">
        {error ? (
          <p id={`${id}-error`} role="alert" className="text-danger text-[13px]">
            {error}
          </p>
        ) : helper ? (
          <p id={`${id}-helper`} className="text-ink-muted text-[13px]">
            {helper}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function Input({
  id,
  invalid,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { id: string; invalid?: boolean }) {
  return (
    <input
      id={id}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid ? `${id}-error` : `${id}-helper`}
      className={controlClasses(invalid, className)}
      {...props}
    />
  );
}

export function Textarea({
  id,
  invalid,
  className,
  rows = 5,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  invalid?: boolean;
}) {
  return (
    <textarea
      id={id}
      rows={rows}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid ? `${id}-error` : `${id}-helper`}
      className={controlClasses(invalid, cn("resize-y", className))}
      {...props}
    />
  );
}

export function Select({
  id,
  invalid,
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  invalid?: boolean;
}) {
  return (
    <select
      id={id}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid ? `${id}-error` : `${id}-helper`}
      className={controlClasses(invalid, cn("appearance-none pr-9", className))}
      {...props}
    >
      {children}
    </select>
  );
}

/**
 * Anti-spam honeypot: visually and programmatically hidden, out of the
 * keyboard path. A human never meets it; a naive bot fills every field.
 */
export function Honeypot({ name = "company_website" }: { name?: string }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor={name}>Do not fill this in</label>
      <input id={name} name={name} type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
