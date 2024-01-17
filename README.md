# rollup-plugin-md-icon

Generates fonts with only the symbols you use in your app ✨

## Install

`npm add -D rollup-plugin-md-icon`

## ⚒️ Usage

`rollup.config.js`:

```js
import {mdIcon} from 'rollup-plugin-md-icon';

export default {
  plugins: [mdIcon()],
};
```

(By default the plugin only caches icons found in your code and convert icon names to codepoints.)

### 👷 During development

The recommended way is to use the all symbols font from fonts.googleapis.com for easy and smooth development, all you need is to link this general stylesheet in your page:

```html
<head>
  <link
    id="symbols"
    href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined"
    rel="stylesheet"
  />
</head>
```

⚠️ Notice the `id="symbols"` attribute which is **required** so the plugin understands that this link needs to be minified later!

_(There is also a local stylesheet you can use when [Working offline](https://github.com/vdegenne/rollup-plugin-md-icon/wiki/Working-offline))_

### 📦 At build time

It all depends if you prefer having the font files locally or if you want to let fonts.googleapis.com serve your users the files.  
You have to choose one of these 2 strategies:

### 1. Let fonts.googleapis.com serve the font

Read [instructions](https://github.com/vdegenne/rollup-plugin-md-icon/wiki/Serving-from-fonts.googleapis.com) on the wiki.

### 2. Serve the font locally

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
import {
  mdIcon,
  mdIconDownload,
  replaceSymbolsLink,
} from 'rollup-plugin-md-icon';
import {rollupPluginHTML as html} from '@web/rollup-plugin-html';

const DEV = process.env.NODE_ENV == 'DEV';

export default {
  plugins: [
    mdIcon(),
    DEV
      ? []
      : [
          mdIconDownload(),
          html({
            transformHtml: (html) => {
              if (DEV) return html;
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

## Development

The monorepo of this plugin can be found [here](https://github.com/vdegenne/rollup-plugin-md-icon-monorepo)

## How it works

The plugin scans the source code on build start (also works in watch mode) to build a list of all used icons called a codepoints list. This list is used in URLs to instruct the Google Font server to serve a final font file that only contain these icons. The icon names are converted to codepoints in the final bundle.

## Known limitations

- The plugin scans all the files matching the provided glob pattern (option `include`) which means the final font could potentially includes icons that are or will not be used at runtime if some files are being excluded from the module graph at build time.

## License

MIT
