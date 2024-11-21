import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  outline?: boolean;
}

export function MainButton({ children, className, outline, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center justify-center rounded-main px-7 py-7 text-heading-6 font-bold transition-colors hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:shadow aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        outline ? 'bg-transparent border border-white hover:bg-transparent' : 'bg-primary text-white',
        className,
      )}
    >
      {children}
    </button>
  );
}
