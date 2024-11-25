import {deleteMovie} from '@/lib/actions'
import {MdDelete} from 'react-icons/md'

export function DeleteMovieButton({ id }: { id: string }) {
  const deleteMovieWithId = deleteMovie.bind(null, id);

  return (
    <form action={deleteMovieWithId}>
      <button>
        <span className="sr-only">Delete</span>
        <MdDelete className="w-5" color="#EB5757"/>
      </button>
    </form>
  );
}
