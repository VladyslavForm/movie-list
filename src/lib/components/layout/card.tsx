import Image from 'next/image'

interface CardProps {
  image: string
  title: string
  year: string
}

export const Card = ({image, title, year}: CardProps) => {
  return (
    <div className="p-2 rounded-xl bg-card">
      <Image src={image} alt="" width={266} height={400} className="rounded-xl w-full"/>
      <div className="p-2">
        <p className="text-body-large mb-2">{title}</p>
        <p>{year}</p>
      </div>
    </div>
  )
}
