# rollup-plugin-md-icon

[![Published on npm](https://img.shields.io/npm/v/rollup-plugin-md-icon.svg?logo=npm)](https://www.npmjs.com/package/rollup-plugin-md-icon)

Generates fonts with only the symbols you use in your app ✨

## Install

```
npm add -D rollup-plugin-md-icon
```

## Usage

## 👷 During development

Do not use anything _!_
Just add this stylesheet in the header of your html document:

```html
<head>
  <link
    id="symbols"
    href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined"
    rel="stylesheet"
  />
</head>
```

This stylesheet serves a font that contains all symbols from fonts.googleapis.com ([learn more](https://github.com/vdegenne/rollup-plugin-md-icon/wiki/During-development))

## 📦 At build time

From here you can opt for 2 strategies:

1️⃣ Serve minified font file from fonts.googleapis.com : See [instructions](https://github.com/vdegenne/rollup-plugin-md-icon/wiki/Serving-from-fonts.googleapis.com) on the wiki.

2️⃣ Serve font file locally: See [instructions](https://github.com/vdegenne/rollup-plugin-md-icon/wiki/Serving-fonts-locally) on the wiki.

## Development

The monorepo of this plugin can be found [here](https://github.com/vdegenne/rollup-plugin-md-icon-monorepo)

## How it works

The plugin scans the source code to build a list of all used icons called a codepoints list which is saved under the cache directory `.mdicon`. The cache system is used to avoid downloading the fonts every time rollup runs (which can happen a lot during development). The cached codepoints list is used to generate minimal final font files or urls depending on which strategy you use at build time.

## Known limitations

- The plugin scans all the files matching the provided glob pattern (option `include`) which means the final font could potentially includes icons that are or will not be used at runtime if some files are being excluded from the module graph at build time.

## License

MIT
