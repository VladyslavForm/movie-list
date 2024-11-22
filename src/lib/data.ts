import {sql} from '@vercel/postgres'
import {unstable_noStore as noStore} from 'next/cache'

export async function fetchMovies() {
  noStore()

  try {
    const data = await sql`
        SELECT id, title, release_year, image
        FROM movies
        ORDER BY release_year DESC
    `

    return data.rows
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch movies.')
  }
}

export async function fetchMovieById(id: string) {
  noStore()

  try {
    const data = await sql`
        SELECT id, title, release_year, image
        FROM movies
        WHERE id = ${id}
    `

    return data.rows[0]
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch movie.')
  }
}

const ITEMS_PER_PAGE = 10

export async function fetchPaginatedMovies(currentPage: number) {
  noStore()
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  try {
    const data = await sql`
        SELECT id, title, release_year, image
        FROM movies
        ORDER BY release_year DESC
            LIMIT ${ITEMS_PER_PAGE}
        OFFSET ${offset}
    `

    return data.rows
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch paginated movies.')
  }
}

export async function fetchMoviesTotalPages() {
  noStore()

  try {
    const data = await sql`
        SELECT COUNT(*) AS count
        FROM movies
    `

    const totalMovies = Number(data.rows[0].count)
    const totalPages = Math.ceil(totalMovies / ITEMS_PER_PAGE)

    return totalPages
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch total number of movies.')
  }
}
