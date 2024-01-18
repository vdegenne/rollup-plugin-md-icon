import {defineConfig} from 'rollup';
import {mdIcon} from 'rollup-plugin-md-icon';
import {cssModules} from 'rollup-plugin-css-modules';
import {rollupPluginHTML as html} from '@web/rollup-plugin-html';
import {nodeResolve} from '@rollup/plugin-node-resolve';

export default defineConfig({
	input: 'index.html',
	output: {dir: 'dist'},
	plugins: [
		html(),
		nodeResolve(),
		mdIcon({
			symbols: {
				stylesheetPath: './src/symbols.css',
			},
		}),
		cssModules(),
	],
});
