/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* jshint esversion: 9 */

const sveltePreprocess = require('svelte-preprocess');

const config = {
	preprocess: [
		sveltePreprocess({
			defaults: {
				style: 'scss',
			},
			scss: {
				prependData: `@import 'src/styles/variables/index.scss';\n`,
				outputStyle: 'compressed',
			},
		}),
	],
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	}
};

module.exports =  config;
