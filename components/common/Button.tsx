import { ComponentProps } from 'react';

type Variant = 'solid' | 'outline';
type Size = 'sm' | 'md' | 'lg';

const variantClass: Record<Variant, string> = {
  solid: 'bg-accent text-on-accent',
  outline: 'border border-line',
};

const sizeClass: Record<Size, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

type ButtonProps = ComponentProps<'button'> & {
  variant?: Variant;
  size?: Size;
};
export function Button({
  variant = 'outline',
  size = 'md',
  type = 'button',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const base =
    'rounded-full font-bold px-[1.2em] py-[0.7em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';
  return (
    <button
      type={type}
      className={`${base} ${variantClass[variant]} ${sizeClass[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
