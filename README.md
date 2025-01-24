# Fit Text

Fit text to a container, a precise width or height, or fit to a single line and trim the overflow.

[Demo](https://activetheory.github.io/fit-text/)

## Installation

```bash
npm install @activetheory/fit-text
```

## Usage

```js
import fitText from '@activetheory/fit-text';

const el = document.querySelector('.el');
const box = document.querySelector('.box');

const result = fitText({
  el,
  box,
  afterFit: console.log,
});
```

## Options

- `el`: The element to fit text to.
- `box`: The container element to fit text to. (optional)
- `afterFit`: A callback function that is called after the text is fit. It receives the result of the fitText function. (optional)
- `singleLine`: Whether to fit text to a single line. (optional)
- `clipOnly`: Whether to only clip the text. (optional)
- `boxMultiplier`: The multiplier to use for the box. It needs to be an array of two numbers, the first is the multiplier for the width, the second is the multiplier for the height. (optional)
- `maxWidth`: The maximum width to fit text to. It can be a number or a function that returns a number. (optional)
- `maxHeight`: The maximum height to fit text to. It can be a number or a function that returns a number. (optional)
- `minFontSize`: The minimum font size to use. It can be a number or a function that returns a number. (optional)
- `debug`: Whether to log debug information. (optional)
- `flip`: Whether to flip the axis of the box. (optional)
- `clip`: The string to use for clipping the text. (optional)
- `htmlClip`: The HTML string to use for clipping the text. (optional)
- `maxWidthLimit`: The maximum width limit to use. (optional)
- `maxHeightLimit`: The maximum height limit to use. (optional)

## Demo

See the [demo](./demo) folder for examples.
To run the demo, run `npm run dev`.
