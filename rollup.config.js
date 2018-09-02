import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import string from 'rollup-plugin-string';
import babel from 'rollup-plugin-babel';


// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		file: 'public/bundle.js',
		format: 'iife', // immediately-invoked function expression — suitable for <script> tags
		sourcemap: true
	},
	plugins: [
		resolve(), // tells Rollup how to find date-fns in node_modules
		commonjs(), // converts date-fns to ES modules
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
		production && uglify(), // minify, but only in production
    string({
			// Required to be specified
			include: ['**/*.html','**/*.css'],

			// Undefined by default
			exclude: ['**/index.html']
		})
	]
};
