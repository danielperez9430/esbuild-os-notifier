# esbuild-os-notifier

[![NPM Version](https://img.shields.io/npm/v/esbuild-os-notifier)](https://www.npmjs.com/package/esbuild-os-notifier)
[![NPM Downloads](https://img.shields.io/npm/dm/esbuild-os-notifier)](https://www.npmjs.com/package/esbuild-os-notifier)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/esbuild-os-notifier)](https://bundlephobia.com/package/esbuild-os-notifier)

Native OS notifications for your [esbuild](https://esbuild.github.io/) builds — know the moment your build passes, fails, or emits warnings without leaving your editor.

Cross-platform support for macOS, Windows, and Linux via [node-notifier](https://github.com/mikaelbr/node-notifier).

## Install

```bash
npm i -D esbuild-os-notifier
```

```bash
yarn add -D esbuild-os-notifier
```

```bash
pnpm add -D esbuild-os-notifier
```

## Usage

```js
import { build } from 'esbuild'
import esbuildOsNotifier from 'esbuild-os-notifier'

await build({
  entryPoints: ['src/index.js'],
  bundle: true,
  outfile: 'dist/index.js',
  plugins: [esbuildOsNotifier()],
})
```

## Options

```js
esbuildOsNotifier(
  {
    // node-notifier options
    contentImage: './logo.png',   // Path to a custom icon (300×300px recommended)
    sound: true,                   // Play a sound with the notification
    timeout: 5000,                 // Auto-dismiss after 5 seconds
  },
  {
    // Toggle per-category notifications
    warnings: true,
    errors: true,
    success: true,
  }
)
```

### Defaults

By default all three notification types are enabled. Set any to `false` to suppress that category.

## How it works

Hooks into esbuild's `onStart` and `onEnd` build events. When a build finishes:

- **Success** — a single notification with the build status
- **Errors** — individual notifications per error with file, line, and column info
- **Warnings** — individual notifications per warning with location info
