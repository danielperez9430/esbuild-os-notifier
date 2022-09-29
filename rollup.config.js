import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

// Rollup config
export default [
    { // CommonJS
        input: 'src/index.ts',
        output: {
            sourcemap: true,
            file: 'dist/index.cjs',
            format: 'cjs',
            exports: 'default',
        },
        external: ['node-notifier'],
        plugins: [commonjs(), resolve(), typescript({ sourceMap: true })],
    },
    {   // ESM Module
        input: 'src/index.ts',
        output: {
            sourcemap: true,
            file: 'dist/index.js',
            format: 'esm',
        },
        external: ['node-notifier'],
        plugins: [commonjs(), resolve(), typescript({ sourceMap: true })],
    }
]