import Image from 'next/image'
import {MdEdit} from 'react-icons/md'
import {Movie} from '@/lib/definitions'
import Link from 'next/link'
import {DeleteMovieButton} from '@/lib/components/buttons/delete-movie'

export const Card = ({image, title, release_year, id}: Movie) => {
  return (
    <div className="p-2 rounded-xl bg-card">
      <Image src={image} alt="" width={266} height={400} className="rounded-xl w-full h-[400px] object-cover"/>
      <div className="p-2">
        <div className="flex justify-between items-center">
          <p className="text-body-large mb-2">{title}</p>
          <Link href={`update-movie/${id}`}>
            <MdEdit className="w-5 h-5"/>
          </Link>
        </div>
        <div className="flex justify-between items-center">
          <p>{release_year}</p>
          <DeleteMovieButton id={id} />
        </div>
      </div>
    </div>
  )
}
