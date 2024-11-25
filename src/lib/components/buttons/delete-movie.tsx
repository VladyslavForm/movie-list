import {deleteMovie} from '@/lib/actions'
import {MdDelete} from 'react-icons/md'

export function DeleteMovieButton({ id }: { id: string }) {
  const deleteMovieWithId = deleteMovie.bind(null, id)

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <form action={deleteMovieWithId}>
      <button>
        <span className="sr-only">Delete</span>
        <MdDelete className="w-5" color="#EB5757"/>
      </button>
    </form>
  )
}
