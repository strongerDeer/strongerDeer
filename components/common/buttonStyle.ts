export type ButtonVariant = 'solid' | 'outline' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';

// Tailwind v4는 button 기본 커서를 default로 둬서 cursor-pointer를 직접 준다.
// 꺼진 버튼은 누를 수 없다는 걸 보여 주려고 다시 기본 커서로
const base =
  'font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent inline-flex items-center justify-center gap-1 cursor-pointer disabled:cursor-default';

const boxed = 'rounded-full px-[1.2em] py-[0.7em]';

const variantClass: Record<ButtonVariant, string> = {
  solid: `${boxed} bg-accent text-on-accent`,
  outline: `${boxed} border border-line bg-background`,
  text: 'rounded-sm text-accent underline-offset-4 hover:underline',
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
