import React from 'react';
import { FofrInput } from './components/FofrInput';
import { appInit } from './utils/init';

export * from './components/FofrSkeleton';
export * from './components/FofrButton';
export * from './components/FofrInput';
export * from './utils/utils';
export * from './utils/init';
export * from './enums/css';
export * from './styled/mixins';
export * from './hooks';

// Nepoužívat default import/export !!
appInit({
  globalCSSVars: {
    clrBg: 'rgb(250, 244, 244)',
    clrMain: '#971a1a',
    clrGrey: 'rgb(230, 220, 220)',
  },
});

export const Thing = () => {
  return (
    <>
      <FofrInput type="text" label="Username" id="username" variant="two" />
    </>
  );
};
