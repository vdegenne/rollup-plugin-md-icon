This example was made to demonstrate two things:

- The use of [`rollup-plugin-md-icon`](https://github.com/vdegenne/rollup-plugin-md-icon) to generate both Material Symbols **stylesheet** and _minified_ **font** file locally.

- The use of [`rollup-plugin-css-modules`](https://github.com/justinfagnani/rollup-plugin-css-modules) to bundle the **stylesheet** directly inside the bundle.

The outcome of this is only one icons font file left to serve, reduced to only the icons used in the source code.

## Try it out

```
git clone https://github.com/vdegenne/rollup-plugin-md-icon.git
cd rollup-plugin-md-icon/example
npm i
npm run dev
```
