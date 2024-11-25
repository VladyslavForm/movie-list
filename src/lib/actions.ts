'use server'

import {z} from 'zod'
import {sql} from '@vercel/postgres'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {signIn} from '@/auth'
import {AuthError} from 'next-auth'
import {uploadImageToSupabase} from '@/lib/uploadImageToSupabase'

const FormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, {message: 'Please enter a movie title.'}),
  release_year: z.coerce
    .number()
    .gte(1900, {message: 'Release year must be 1900 or later.'}),
  image: z.string().url({message: 'Please provide a valid image URL.'}),
})

const CreateMovie = FormSchema.omit({id: true})
const UpdateMovie = FormSchema.omit({id: true})

export type State = {
  errors?: {
    title?: string[];
    release_year?: string[];
    image?: string[];
  };
  message?: string | null;
};

export async function createMovieAction(prevState: State, formData: FormData) {
  try {
    const imageFile = formData.get('image')
    if (!(imageFile instanceof File) || imageFile.size === 0) {
      return {
        errors: {image: ['Please provide an image.']},
        message: 'Validation failed. Failed to create movie.',
      }
    }

    const imageUrl = await uploadImageToSupabase(imageFile)
    formData.set('image', imageUrl)

    const validatedFields = CreateMovie.safeParse({
      title: formData.get('title'),
      release_year: formData.get('release_year'),
      image: formData.get('image'),
    })

    if (!validatedFields.success) {
      console.error('Validation failed:', validatedFields.error)
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Validation failed. Failed to create movie.',
      }
    }

    const {title, release_year, image} = validatedFields.data

    await sql`
        INSERT INTO movies (title, release_year, image)
        VALUES (${title}, ${release_year}, ${image})
    `
  } catch (error) {
    console.error('Error in createMovieAction:', error)
    return {
      message: 'An unexpected error occurred.',
    }
  }

  revalidatePath('/')
  redirect('/')
}

export async function updateMovie(id: string, prevState: State, formData: FormData) {
  let imageUrl = ''

  const imageValue = formData.get('image')

  if (imageValue instanceof File && imageValue.size > 0) {
    imageUrl = await uploadImageToSupabase(imageValue)
    formData.set('image', imageUrl)
  } else if (typeof imageValue === 'string') {
    imageUrl = imageValue
  } else {
    console.log('Fetching current image URL from database...')
    const {rows} = await sql`SELECT image
                             FROM movies
                             WHERE id = ${id}`
    if (rows.length > 0) {
      imageUrl = rows[0].image
      formData.set('image', imageUrl)
    } else {
      throw new Error('Movie not found')
    }
  }

  const validatedFields = UpdateMovie.safeParse({
    title: formData.get('title'),
    release_year: formData.get('release_year'),
    image: formData.get('image'),
  })

  if (!validatedFields.success) {
    console.error('Validation failed:', validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Failed to Update Movie.',
    }
  }

  const {title, release_year, image} = validatedFields.data

  try {
    await sql`
        UPDATE movies
        SET title        = ${title},
            release_year = ${release_year},
            image        = ${image}
        WHERE id = ${id}
    `
  } catch (error) {
    console.error('Database error:', error)
    return {message: 'Database Error: Failed to Update Movie.'}
  }

  revalidatePath('/')
  redirect('/')
}

export async function deleteMovie(id: string) {
  try {
    await sql`DELETE
              FROM movies
              WHERE id = ${id}`
    revalidatePath('/')
    return {message: 'Deleted Movie.'}
  } catch (error) {
    console.error(error)
    return {message: 'Database Error: Failed to Delete Movie.'}
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log(formData)
    await signIn('credentials', formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}
