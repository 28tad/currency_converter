declare module '*.scss' {
  interface IClassNames {
    [className: string]: string;
  }
  const classnames: IClassNames;
  export = classnames;
}

declare module 'big.js' {
  const Big: any;
  export = Big;
}

declare const __IS_DEV__: boolean;
