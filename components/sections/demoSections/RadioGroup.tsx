import { Option } from '@/data/displaySettings';

type RadioGroupProps<T extends string> = {
  legend: string;
  name: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function RadioGroup<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
}: RadioGroupProps<T>) {
  return (
    <fieldset>
      <legend className='mb-1.5 text-sm font-bold text-foreground-muted'>
        {legend}
      </legend>
      <div className='flex gap-1.5'>
        {options.map((option) => (
          <label
            key={option.value}
            className='inline-flex cursor-pointer items-center rounded-pill border border-line bg-background px-3 py-1 text-sm font-semibold whitespace-nowrap has-checked:border-accent has-checked:bg-accent-soft has-checked:inset-ring has-checked:inset-ring-accent has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent'
          >
            <input
              type='radio'
              name={name}
              value={option.value}
              checked={option.value === value}
              onChange={() => onChange(option.value)}
              className='sr-only'
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
