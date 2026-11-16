import { ComponentProps } from 'react';

import {
  buttonClass,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/buttonStyle';

type ButtonProps = ComponentProps<'button'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};
export function Button({
  variant = 'outline',
  size = 'md',
  type = 'button',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClass({ variant, size, className })}
      {...rest}
    >
      {children}
    </button>
  );
}
