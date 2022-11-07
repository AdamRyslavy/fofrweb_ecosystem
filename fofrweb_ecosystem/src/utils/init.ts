interface init {
  globalCSSVars: { [key: string]: string };
}

function css(element: any, style: any) {
  for (const property in style) {
    element.style.setProperty('--' + property, style[property]);
  }
}

export const appInit = (init: Partial<init>) => {
  if (!init.globalCSSVars || !Object.keys(init.globalCSSVars).length) {
    console.error(
      'globalCSSVars were not initialized, include them in appInit'
    );
    return;
  }
  let root = document.querySelector(':root');
  css(root, init.globalCSSVars);
};
