# React + TypeScript + Vite

## Expanding the ESLint configuration

If you are developing a **frontend production application**, you can use the following scripts defined in the `package.json` file to manage your project:

```json
"scripts": {
  "dev": "vite", // Starts the development server with Vite
  "build": "tsc -b && vite build", // Builds the TypeScript project and bundles the app for production
  "build2": "tsc -b && vite build --base=./", // Builds the app with a relative base path
  "lint": "eslint .", // Runs ESLint to check for code quality and style issues
  "preview": "vite preview" // Serves the production build locally for preview
}
```

### Explanation of Commands

- **`dev`**: Launches the development server with hot module replacement (HMR) for a smooth development experience.
- **`build`**: Compiles the TypeScript code and creates an optimized production build using Vite.
- **`build2`**: Similar to `build`, but sets the base path to `./`, which is useful for deploying to environments where the app is not served from the root.
- **`lint`**: Runs ESLint to analyze your code for potential errors and enforce coding standards.
- **`preview`**: Starts a local server to preview the production build, simulating how it will behave in a live environment.

These scripts streamline the development and deployment process, ensuring a consistent workflow for your frontend application.production application, we recommend updating the configuration to enable type-aware lint rules:
