import React from 'react';
import { StyledBaseButton } from '../styled/Button';
import { btnProps } from '../types/props';
import { bubble } from '../utils/ripple';

export const FofrButton = (props: btnProps) => {
  const { variant } = props;
  const handleClick = (e: any) => {
    props.onClick?.(e);
    bubble(e, variant !== 'secondary' ? 'white' : 'var(--clrMain)');
  };

  return (
    <StyledBaseButton {...props} onClick={e => handleClick(e)}>
      {props.label}
    </StyledBaseButton>
  );
};
