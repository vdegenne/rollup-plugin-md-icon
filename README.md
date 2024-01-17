# rollup-plugin-md-icon

Generates fonts with only the symbols you use in your app ✨

## Install

`npm add -D rollup-plugin-md-icon`

## Usage

# 👷 During development

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

# 📦 At build time

From here you can opt for 2 strategies:

1️⃣ Serve minified font file from fonts.googleapis.com : See [instructions](https://github.com/vdegenne/rollup-plugin-md-icon/wiki/Serving-from-fonts.googleapis.com) on the wiki.

2️⃣ Serve font file locally: See [instructions](https://github.com/vdegenne/rollup-plugin-md-icon/wiki/Serving-fonts-locally) on the wiki.

## Development

The monorepo of this plugin can be found [here](https://github.com/vdegenne/rollup-plugin-md-icon-monorepo)

## How it works

The plugin scans the source code on build start (also works in watch mode) to build a list of all used icons called a codepoints list. This list is used in URLs to instruct the Google Font server to serve a final font file that only contain these icons. The icon names are converted to codepoints in the final bundle.

## Known limitations

- The plugin scans all the files matching the provided glob pattern (option `include`) which means the final font could potentially includes icons that are or will not be used at runtime if some files are being excluded from the module graph at build time.

## License

MIT
