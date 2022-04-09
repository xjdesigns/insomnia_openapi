// import babel from 'rollup-plugin-babel'
// import { babel } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import resolve from 'rollup-plugin-node-resolve'
import multiEntry from 'rollup-plugin-multi-entry'
import { terser } from "rollup-plugin-terser"
// import commonjs from 'rollup-plugin-commonjs'
// import { uglify } from 'rollup-plugin-uglify'

const isProduction = process.env.BUILD === 'production'

const extensions = [
  '.js', '.ts',
]

export default {
  input: 'src/index.ts',
  output: {
    file: 'lib/index.js',
    format: 'cjs'
  },
  plugins: [
    multiEntry(),
		// babel({ babelHelpers: 'bundled' }),
    resolve({
			extensions: [ '.ts', '.js', ]
    }),
		typescript(),
		isProduction ? terser() : null
    // commonjs(),
    // isProduction ? uglify() : null
  ]
};
