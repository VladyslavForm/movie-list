import clsx from 'clsx'
import Image from 'next/image'

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string
  label?: string
}

export function IconButton({ label, icon, className, ...rest }: IconButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center justify-center rounded-md px-4 text-heading-6 font-bold transition-colors aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className,
      )}
    >
      {label && <span className="mr-2">{label}</span>}
      <Image src={icon} alt="" width={32} height={32}/>
    </button>
  )
}
