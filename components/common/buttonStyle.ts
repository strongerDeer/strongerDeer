export type ButtonVariant = 'solid' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'rounded-full font-bold px-[1.2em] py-[0.7em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent inline-flex items-center justify-center gap-1';

const variantClass: Record<ButtonVariant, string> = {
  solid: 'bg-accent text-on-accent',
  outline: 'border border-line bg-background',
};

const sizeClass: Record<ButtonSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export function buttonClass({
  variant = 'outline',
  size = 'md',
  className = '',
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return `${base} ${variantClass[variant]} ${sizeClass[size]} ${className}`;
}
