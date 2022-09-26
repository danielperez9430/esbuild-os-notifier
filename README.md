# esbuild-os-notifier

[![NPM Version](https://img.shields.io/npm/v/esbuild-os-notifier)](https://www.npmjs.com/package/esbuild-os-notifier)
[![NPM Downloads](https://img.shields.io/npm/dm/esbuild-os-notifier)](https://www.npmjs.com/package/esbuild-os-notifier)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/esbuild-os-notifier)

Esbuild plugin for receive OS notification when your build finish, have an error or a warning

## 📦 Install 
> yarn add dev esbuild-os-notifier

or

> npm i -D esbuild-os-notifier

## 🚀 Usage

Add it to your esbuild plugins list:

```js
import { build } from 'esbuild'
import esbuildOsNotifier from 'esbuild-os-notifier'

esbuild.build({
  ...
  plugins: [
    esbuildOsNotifier()
  ]
  ...
});

```

## Options
You can add your own custom configuration of options to esbuildOsNotifier

```js
markdownPlugin({
  // node_notifier options
}, {
    // Show or disable notifications for error, warnings or sucess
});
```
