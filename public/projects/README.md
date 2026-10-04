# Project screenshots

Each timeline entry in `src/data/projects.ts` looks for its screenshots here at build time:

    public/projects/<project id>/screen-1.webp
    public/projects/<project id>/screen-2.webp
    public/projects/<project id>/screen-3.webp

The number matches the screen's position in that entry's `screens` array. A missing file
falls back to a wireframe placeholder frame, so entries can be filled in one at a time with
no code change.

Sizes (keep files small, WebP, roughly 30 KB or less):

- phone: 300 x 600
- phone-landscape: 600 x 300
- desktop: 640 x 400

Rules: no real brand, product or client names or logos, in the image, its metadata or its file name.
