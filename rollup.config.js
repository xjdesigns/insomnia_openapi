import typescript from '@rollup/plugin-typescript';
import resolve from 'rollup-plugin-node-resolve'
import multiEntry from 'rollup-plugin-multi-entry'
import { terser } from 'rollup-plugin-terser'

const isProduction = process.env.BUILD === 'production'

export default {
  input: 'src/index.ts',
  output: {
    file: 'lib/index.js',
    format: 'cjs'
  },
  plugins: [
    multiEntry(),
    resolve({
			extensions: [ '.ts', '.js', ]
    }),
		typescript(),
		isProduction ? terser() : null
  ]
};
