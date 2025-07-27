import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['node/app.ts'],
  outDir: 'build-server',
  format: ['esm'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: false,
  target: 'esnext',
  shims: false,
  skipNodeModulesBundle: true,
  external: [],
})
