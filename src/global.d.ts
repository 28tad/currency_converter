declare module '*.scss' {
  interface IClassNames {
    [className: string]: string;
  }
  const classnames: IClassNames;
  export = classnames;
}

declare const __IS_DEV__: boolean;
