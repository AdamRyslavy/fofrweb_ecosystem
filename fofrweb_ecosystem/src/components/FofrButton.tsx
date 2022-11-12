import React from 'react';
import { StyledBaseButton } from '../styled/Button';
import { btnProps } from '../types/props';
import { bubble } from '../utils/ripple';

export const FofrButton = (props: btnProps) => {
  const { variant = 'primary' } = props;
  const handleClick = (e: any) => {
    props.onClick?.(e);
    bubble(e, variant === 'primary' ? 'white' : 'var(--clrMain)');
  };

  return (
    <StyledBaseButton {...props} onClick={e => handleClick(e)}>
      {props.label}
    </StyledBaseButton>
  );
};
