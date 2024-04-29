# Browser Extension React TypeScript Boilerplate

This boilerplate provides a starting point for building browser extensions using React, TypeScript, and webpack.

## Features

- **React**: Utilize the power of React to build dynamic and interactive UI components for your browser extension.
- **TypeScript**: Write type-safe code and catch errors early with TypeScript.
- **webpack**: Bundle your extension code efficiently with webpack, optimizing performance and compatibility.

## Getting Started

Follow these steps to get started with the boilerplate:

1. Clone this repository.
2. Install dependencies with `npm install`.
3. Build your extension for development mode with `npm start`.
4. Build your extension for production with `npm run build`.

## Folder Structure

- **src**: Contains the source code for your extension.
  - **background**: Background scripts for handling extension events and background tasks.
    - **background.ts**: Main background script file.
  - **contentScript**: Content scripts injected into web pages to interact with page content.
    - **contentScript.ts**: Content script file.
  - **options**: Options page for extension settings.
    - **options.tsx**: Options page React component.
    - **options.css**: Styles for the options page.
  - **popup**: Popup window for quick access to extension functionality.
    - **popup.tsx**: Popup window React component.
    - **popup.css**: Styles for the popup window.
  - **static**: Static assets like icons, and manifest.json.

## Loading The Chrome Extension

1. Open Chrome and navigate to `chrome://extensions/`.
2. Toggle on `Developer mode` in the top right corner.
3. Click `Load unpacked`.
4. Select only the `dist` folder.

## Default Boilerplate Notes

- Directory structures become simplified, eliminating the need for relative image references in HTML files (e.g., using icon.png instead of ../static/icon.png).
- Local TypeScript (ts/tsx) and CSS files are imported relatively, ensuring Webpack builds a proper dependency graph based on these paths.
- Ensure the manifest file is updated in the usual manner for Chrome-related permissions. References to files within this file should also be flattened and not rely on relative paths.
