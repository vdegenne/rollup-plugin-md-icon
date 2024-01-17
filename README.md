# rollup-plugin-md-icon

Generates fonts with only the symbols you use in your app ✨

## Install

`npm add -D rollup-plugin-md-icon`

## ⚒️ Usage

`rollup.config.js`:

```js
import {mdIcon} from 'rollup-plugin-md-icon';

export default {
	plugins: [
		mdIcon({
			variant: 'outlined', // default
			// other options...
		}),
	],
};
```

By default, the plugin does nothing than just converting icon names to codepoints.  
We will need to link a stylesheet loading the font that can display the symbols.  
From here we have 2 options:

### 1️⃣ Request the stylesheet from fonts.googleapis.com

During development we can use the full symbols font

```html
<head>
	<link
		id="symbols"
		href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined"
		rel="stylesheet"
	/>
</head>
```

_(⚠️ Notice the `id="symbols"` which is **required** so the plugin understands that this link needs to be minified!)_

<details>
  <summary>Working offline</summary>

If requesting a resource over the network is not possible, `rollup-plugin-md-icon` provides an offline stylesheet you can use instead:

- Create a symbolic link inside your static directory:

```
cd www
ln -s ../node_modules/rollup-plugin-md-icon/all-symbols .
```

- Update your `index.html`:

```html
<head>
	<link
		id="symbols"
		href="./all-symbols/material-symbols.css"
		rel="stylesheet"
	/>
</head>
```

</details>

---

Of course for final bundle we'll need to transform this link to incorporate only the icons we need. It quite depends on the tools we use but here's an example using [ `@web/rollup-plugin-html` ](https://modern-web.dev/docs/building/rollup-plugin-html/),

```js
import {mdIcon, transformSymbolsLink} from 'rollup-plugin-md-icon';
import {rollupPluginHTML as html} from '@web/rollup-plugin-html';

export default {
	plugins: [
		mdIcon(),
		html({
			transformHtml: transformSymbolsLink,
		}),
	],
};
```

### 2️⃣S erve the stylesheet/font locally

If you prefer serving the stylesheet and font from your host, then this solution is more suitable. The plugin will help you in automating this process,
`rollup.config.js`:

```js
import {mdIcon} from 'rollup-plugin-md-icon';

export default {
	plugins: [
		mdIcon({
			symbols: {},
		}),
	],
};
```

Adding `symbols` with an empty object is enough to tell the plugin to download minified files (from googleapis.com servers). It will generate two files:

- `material-symbols.css`
- `material-symbols.woff2`

Both under `public` by default
You can change the destination of each of these files using `stylesheetPath` and `fontPath` options individually.
Now you'll need to link the downloaded stylesheet in your html index, for instance

```html
<head>
	<link rel="stylesheet" href="/material-symbols.css" />
</head>
```

####

<details>
  <summary>How to avoid using the plugin during development</summary>

Files are cached under `.mdicon` to reduce requests between local ↔️ fonts.googleapis.com, but still your computer will send a request every time the cache changes (add or remove icons). In watch mode it can happen a lot.  
If you prefer downloading files only at build time then make these changes:
`index.html`:

```html
<head>
	<link
		id="symbols"
		href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined"
		rel="stylesheet"
	/>
</head>
```

_(⚠️ Notice the `id="symbols"` which is **required** so the plugin understands that this link needs to be minified later!)_

`rollup.config.js`:

```js
import {mdIcon, transformSymbolsLink} from 'rollup-plugin-md-icon';
// This serves as an example (you can use what you like)
import {rollupPluginHTML as html} from '@web/rollup-plugin-html';

const DEV = process.env.NODE_ENV == 'DEV';

export default {
	input: 'index.html',
	plugins: [
		DEV
			? [mdIcon(), html()]
			: [
					mdIcon({symbols: {}}),
					html({
						transformHtml: (html) => {
							return replaceSymbolsLink(
								html,
								'<link rel="stylesheet" href="/material-symbols.css">',
							);
						},
					}),
				],
	],
};
```

</details>

---

## How it works

The plugin scans the source code on build start (also works in watch mode) to build a list of all used icons called a codepoints list. This list is used in URLs to instruct the Google Font server to serve a final font file that only contain these icons. The icon names are converted to codepoints in the final bundle.

## Known limitations

- The plugin scans all the files matching the provided glob pattern (option `include`) which means the final font could potentially includes icons that are or will not be used at runtime if some files are being excluded from the module graph at build time.

## License

MIT
