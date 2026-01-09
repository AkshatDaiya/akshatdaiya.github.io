# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    """
    Portfolio — Akshat Daiya

    A modern, responsive developer portfolio built with React, TypeScript, Vite and Tailwind CSS. The site showcases projects, experience, expertise & tools and includes a small, accessible modal for project details with an image carousel.

    This README was generated automatically by scanning the repository and components.

    ---

    ## Quick overview

    - Framework: React + TypeScript
    - Bundler / dev server: Vite
    - Styling: Tailwind CSS + a small global stylesheet
    - Animations: Framer Motion
    - Deploy: configured for GitHub Pages (see `package.json` scripts)

    This repo is intended as a personal portfolio website. It contains sections for Hero/About, Projects (with modal + fullscreen images), Expertise & Tools, and Experience.

    ---

    ## Main scripts

    Run these from the project root:

    - Install dependencies:

    ```powershell
    npm install
    ```

    - Start dev server (hot reload):

    ```powershell
    npm run dev
    ```

    - Build (TypeScript typecheck + Vite build):

    ```powershell
    npm run build
    ```

    - Preview production build locally:

    ```powershell
    npm run preview
    ```

    - Lint (ESLint):

    ```powershell
    npm run lint
    ```

    - Deploy to GitHub Pages (project sets `predeploy` to build):

    ```powershell
    npm run deploy
    ```

    ---

    ## Project structure (key files)

    - `index.html` — app entry
    - `package.json` — scripts & dependencies
    - `vite.config.ts` — Vite configuration (base path handling for GitHub Pages)
    - `src/` — application source
      - `main.tsx` — React entry
      - `index.css` / `styles/global.css` — global styles and Tailwind setup
      - `App.tsx` — top-level layout and component composition
      - `components/`
        - `ThemeToggle.tsx` — theme logic (currently forced to dark, no UI)
        - `SocialIcons.tsx` — LinkedIn/GitHub icons and hover labels
      - `sections/`
        - `Hero/Hero&About.tsx` — hero and about section (LCP image + responsive behavior)
        - `Projects/Projects.tsx` — projects grid, hover reveal, modal with carousel & fullscreen image
        - `Expertise&Tools/Expertise&Tools.tsx` — expertise and tools cards
        - `Experience/Experience.tsx` — experience timeline/section
      - `pages/`
        - `NotFound.tsx` — simple 404 page shown when visiting non-root paths
      - `assets/images/` — project and hero images (e.g., `Community`, `community_groups_reactjs.png`, `Akshat_Daiya.png`, etc.)

    (See the repository `src` folder for the full list of files and images.)

    ---

    ## Important implementation notes (so you can edit safely)

    - Theme: The repository currently forces dark mode on mount (see `src/components/ThemeToggle.tsx`). If you want an interactive toggle, restore the removed UI and adapt the logic.

    - Social icons: `src/components/SocialIcons.tsx` provides GitHub and LinkedIn icons with hover labels. The component has responsive behavior — on small screens it shows compact icons; on larger screens it reveals text on hover.

    - Projects modal and images:
      - `src/sections/Projects/Projects.tsx` implements a modal with a carousel for projects that provide multiple images (the Community project has an `images` array).
      - Click a project to open the modal; click the image to open a fullscreen overlay. Arrow keys navigate slides when fullscreen is open. The modal locks scrolling while open.

    - Vite base path: `vite.config.ts` sets a conditional base for production (GitHub Pages) vs development so local dev doesn't use the repo subpath.

    - Accessibility:
      - Modal uses `role=\"dialog\"` and `aria-modal`.
      - Escape key closes the fullscreen image first, then the modal.
      - Buttons have `aria-label`s. Consider adding a focus trap for improved accessibility (small improvement to add).

    ---

    ## How to add a new project

    1. Open `src/sections/Projects/Projects.tsx`.
    2. Add a new object to the `projects` array. Example:

    ```ts
    {
      title: "New Project",
      role: "Frontend Developer",
      description: "Short summary of the project...",
      tech: ["React", "TypeScript", "Tailwind CSS"],
      image: "./assets/images/newproject-thumb.png",
      // optional: images array for modal/slider
      images: ["./assets/images/newproject-1.png", "./assets/images/newproject-2.png"],
    }
    ```

    3. Add the corresponding images to `src/assets/images/` and import them at the top of `Projects.tsx` (the file currently uses imported images for the Community project).
    4. Rebuild / run dev server to see changes.

    ---

    ## Styling notes

    - Tailwind CSS is used extensively; helper classes and small global CSS are in `src/styles/global.css`.
    - The design uses soft glows (in `App.tsx`) and radial mesh overlays. You can tweak these by editing the `motion.div` and the mesh `div` in `App.tsx`.

    ---

    ## Deployment

    This project is set up to deploy to GitHub Pages.

    - Ensure `package.json` has `homepage` set to your GH pages url (it already contains `https://akshatdaiya.github.io`).
    - The `deploy` script runs `gh-pages -d dist` after building.
    - To deploy:

    ```powershell
    npm run deploy
    ```

    Note: if you prefer Netlify or Vercel, you can remove `gh-pages` and connect the repository there (no special build config required beyond `npm run build`).

    ---

    ## Troubleshooting

    - Type errors: run `npx tsc --noEmit` to view TypeScript errors.
    - Linting: run `npm run lint` and fix reported ESLint issues.
    - If the site path looks wrong locally (for example dev server shows a repo path), confirm `vite.config.ts`'s `base` is set correctly for development.

    ---

    ## Suggestions / next improvements

    - Add a focus trap to modal for better accessibility.
    - Add swipe/drag support to the image carousel for touch devices.
    - Extract the modal and image slider into small reusable components.
    - Add unit/UI tests (Jest/React Testing Library) for critical components.

    ---

    ## Contact

    If you'd like help improving any of these pieces (accessibility, carousel, deployment), open an issue or a PR. If you want me to generate a tailored `README` section (short intro, deploy steps for another host, or CI config), tell me which target you prefer.

    ---

    *This README was generated from the current project layout.*
    """
 