# Business Control Center

A React + Vite dashboard showcasing a business control center with adoption, efficiency, revenue, ROI, quality, and engagement analytics. The project is ready to deploy on Vercel.

## Tech Stack

- [Vite](https://vitejs.dev/) with React and TypeScript
- [Tailwind CSS](https://tailwindcss.com/) utility classes
- [Framer Motion](https://www.framer.com/motion/) for simple transitions
- [Recharts](https://recharts.org/) for data visualizations
- [Lucide Icons](https://lucide.dev/) for UI icons
- [React Router](https://reactrouter.com/) for client-side routing

## Getting Started

```bash
npm install
npm run dev
```

The app will be available at http://localhost:5173. Hot reloading is enabled for rapid development.

## Build

```bash
npm run build
```

This generates an optimized production build in the `dist` directory, suitable for deployment to Vercel.

## Deploying to Vercel

1. Push this repository to GitHub.
2. Create a new Vercel project and import the repository.
3. Accept the defaults (Framework Preset: **Vite**).
4. Vercel will run `npm install` and `npm run build`, and deploy the generated static build.

No additional environment variables are required.
