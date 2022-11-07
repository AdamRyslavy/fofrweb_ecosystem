import { btnVariants } from '../styled/Button';
import React from 'react';

export interface btnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  variant?: keyof typeof btnVariants;
  label: string | number;
}
