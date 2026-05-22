# Changelog

## [1.1.2] - 2026-05-22

### Changed
- Modernized README with clearer structure, pnpm instructions, and modern JS examples
- Replaced fragile `global.__dirname` polyfill with `import.meta.url`-based path resolution
- Updated dependencies: TypeScript ^5.0.0, Rollup ^4.x, esbuild ^0.28.0, deepmerge ^4.3.1

### Fixed
- `get()` utility no longer incorrectly replaces falsy values (`0`, `''`, `false`) with defaults
- Asset path now correctly resolves relative to the package directory instead of CWD
- `omit()` type signature widened to accept any plain object, resolving type errors with `node-notifier` types
- Resolved npm audit vulnerabilities by forcing `uuid` to ^11.1.1 via overrides

## [1.1.1] - 2023-03-07

### Fixed
- Typo in `ShowOptions` type declaration

## [1.1.0] - 2023-03-07

### Changed
- Updated esbuild peer dependency to support 0.17+

## [1.0.4] - 2022-09-29

### Added
- ESM and CommonJS dual output via Rollup

## [1.0.0] - 2022-09-24

### Added
- First release: OS notifications for esbuild build success, errors, and warnings
