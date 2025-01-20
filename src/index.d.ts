export type FitTextResult = {
  fontSize: number;
  text: string;
};

export type FitTextOptions = {
  el: HTMLElement;
  box?: HTMLElement;
  maxWidth?: () => number | number;
  maxHeight?: () => number | number;
  minFontSize?: () => number | number;
  debug?: boolean;
  flip?: boolean;
  clipOnly?: boolean;
  singleLine?: boolean;
  boxWidthOnly?: boolean;
  boxMultiplier?: [number, number];
  clip?: string;
  htmlClip?: string;
  afterFit?: (result: FitTextResult) => void;
  maxWidthLimit?: number;
  maxHeightLimit?: number;
};

export default function fitText(options: FitTextOptions): FitTextResult;
