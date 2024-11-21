interface HeadingProps {
  variant: '1' | '2' | '3' | '4' | '5' | '6';
  text: string,
  className?: string
}

export const Heading = ({variant, text, className}: HeadingProps) => {
  return (
    <div className={`text-white text-heading-${variant} font-semibold ${className ? className : ''}`}>
      {text}
    </div>
  )
}
