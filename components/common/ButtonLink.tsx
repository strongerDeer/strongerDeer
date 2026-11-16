import { ComponentProps } from 'react';

import {
  buttonClass,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/buttonStyle';

type ButtonLinkProps = ComponentProps<'a'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href: string;
  target?: '_blank';
};
export function ButtonLink({
  variant = 'outline',
  size = 'md',
  className = '',
  children,
  target,
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      className={buttonClass({ variant, size, className })}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      {...rest}
    >
      {children}

      {target === '_blank' && <span className='sr-only'> (새 탭)</span>}
    </a>
  );
}
