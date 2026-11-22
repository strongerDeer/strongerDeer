type RadioGroupProps = {
  legend: string;
  name: string;
  options: string[];
};

export function RadioGroup({ legend, name, options }: RadioGroupProps) {
  return (
    <fieldset>
      <legend className='mb-1.5 text-sm font-bold text-foreground-muted'>
        {legend}
      </legend>
      <div className='flex gap-1.5'>
        {options.map((option, index) => (
          <label
            key={option}
            className='inline-flex cursor-pointer items-center rounded-full border border-line bg-background px-3 py-1 text-sm font-semibold whitespace-nowrap has-checked:border-accent has-checked:bg-accent-soft has-checked:inset-ring has-checked:inset-ring-accent has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent'
          >
            <input
              type='radio'
              name={name}
              value={option}
              defaultChecked={index === 0}
              className='sr-only'
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
