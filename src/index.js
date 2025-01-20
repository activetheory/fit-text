export default function fitText({
  el,
  box,
  maxWidth = null,
  maxHeight = null,
  minFontSize = 10,
  debug = false,
  flip = false,
  clipOnly = false,
  singleLine = false,
  boxWidthOnly = false,
  boxMultiplier = [1, 1],
  clip = '...',
  htmlClip = null,
  afterFit = null,
  maxWidthLimit = 999999,
  maxHeightLimit = 999999,
}) {
  if (!el) throw new Error('param `el` is missed for FitText');
  if (!(el instanceof HTMLElement)) throw new Error('param `el` must be an instance of HTMLElement');
  if (box && !(box instanceof HTMLElement)) throw new Error('param `box` must be an instance of HTMLElement');
  if (boxMultiplier && boxMultiplier instanceof Array && boxMultiplier.length !== 2) throw new Error('param `boxMultiplier` must be an array of two numbers');

  let _style;
  let fitResult;

  el.style.removeProperty('font-size');

  if (typeof maxHeight === 'function') maxHeight = Math.ceil(maxHeight());
  if (typeof maxWidth === 'function') maxWidth = Math.ceil(maxWidth());
  if (typeof minFontSize === 'function') minFontSize = Math.ceil(minFontSize());

  if (!el.__originalText) {
    el.__originalText = el.innerHTML;
  } else {
    el.innerHTML = el.__originalText;
  }

  const originalContent = el.__originalText;

  if (!maxHeight && (clipOnly || singleLine)) {
    _style = window.getComputedStyle(el);
    maxHeight = Math.round(Number(_style.lineHeight.replace('px', '')));
  }

  if (box) {
    maxWidth = maxWidth || (box?.offsetWidth || maxWidthLimit) * boxMultiplier[0];
    maxHeight = boxWidthOnly ? maxHeight : (box?.offsetHeight || maxHeightLimit) * boxMultiplier[1];
  }

  maxWidth = maxWidth || maxWidthLimit;
  maxHeight = maxHeight || maxHeightLimit;

  if (flip) {
    let temp = maxHeight;
    maxHeight = maxWidth;
    maxWidth = temp;
  }

  const style = _style || window.getComputedStyle(el);
  const maxFontSize = Math.round(Number(style.fontSize.replace('px', '')));

  let testFitting = 0;
  const fitting = () => {
    testFitting++;

    if (testFitting > 2000) {
      return true;
    }

    if (debug) {
      console.log(
        `maxWidth: ${maxWidth}`,
        `maxHeight: ${maxHeight}`,
        `width: ${el.offsetWidth}`,
        `scrollWidth: ${el.scrollWidth}`,
        `height: ${el.offsetHeight}`,
        `scrollHeight: ${el.scrollHeight}`,
        maxFontSize,
        minFontSize,
        el
      );
    }

    return el.scrollWidth <= maxWidth && (maxHeight ? el.offsetHeight <= maxHeight : true);
  };

  if (fitting()) {
    fitResult = {
      text: el.__originalText,
      fontSize: maxFontSize,
    };

    afterFit?.(fitResult);

    return fitResult;
  }

  // doesn't fit
  let fontSizeTry = maxFontSize - 1;

  if (!clipOnly) {
    while (!fitting() && fontSizeTry > minFontSize) {
      el.style.fontSize = `${fontSizeTry}px`;
      fontSizeTry -= 1;
      if (singleLine) maxHeight = Math.round(Number(style.lineHeight.replace('px', '')));
    }

    if (fitting()) {
      fitResult = {
        text: el.__originalText,
        fontSize: fontSizeTry + 1,
      };

      afterFit?.(fitResult);

      return fitResult;
    }
  }

  let tryMaxCharLength = originalContent.length;
  while (!fitting()) {
    el.innerHTML = clipString(originalContent, tryMaxCharLength, clip);
    if (htmlClip) el.innerHTML += htmlClip;
    tryMaxCharLength -= 1;
  }

  fitResult = {
    text: el.innerHTML,
    fontSize: fontSizeTry + 1,
  };

  afterFit?.(fitResult);

  return fitResult;
}

function clipString(str, length, clip) {
  return length > str.length ? str : str.slice(0, Math.max(0, length - clip.length)) + clip;
}
