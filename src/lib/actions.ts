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

export async function createMovieAction(formData: FormData) {
  // todo add validation for all 3 fields

  try {
    const imageFile = formData.get('image')
    const imageUrl = await uploadImageToSupabase(imageFile)

    formData.set('image', imageUrl)
    await saveMovieToDbAction(formData)

  } catch (error) {
    console.error(error)
  }

  revalidatePath('/')
  redirect('/')
}

export async function saveMovieToDbAction(formData: FormData) {
  const validatedFields = CreateMovie.safeParse({
    title: formData.get('title'),
    release_year: formData.get('release_year'),
    image: formData.get('image'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Movie.',
    }
  }

  const {title, release_year, image} = validatedFields.data

  try {
    await sql`
        INSERT INTO movies (title, release_year, image)
        VALUES (${title}, ${release_year}, ${image})
    `
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function updateMovie(id: string, formData: FormData) {
  console.log('id', id)
  console.log('formData', formData)

  let imageUrl = ''

  const imageValue = formData.get('image')

  if (imageValue instanceof File && imageValue.size > 0) {
    console.log('Uploading new image...')
    imageUrl = await uploadImageToSupabase(imageValue)
    formData.set('image', imageUrl)
  } else if (typeof imageValue === 'string') {
    console.log('Using existing image URL...')
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

  console.log('Updated formData:', formData)

  const validatedFields = UpdateMovie.safeParse({
    title: formData.get('title'),
    release_year: formData.get('release_year'),
    image: formData.get('image'),
  })

  console.log('validatedFields', validatedFields)

  if (!validatedFields.success) {
    console.error('Validation failed:', validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Failed to Update Movie.',
    }
  }

  const {title, release_year, image} = validatedFields.data

  console.log('title, release_year, image', title, release_year, image)

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

  console.log('after try catch')

  revalidatePath('/')
  redirect('/')
}

// export async function updateMovie(id: string, formData: FormData) {
//   console.log('id', id)
//   console.log('formData', formData)
//
//   const validatedFields = UpdateMovie.safeParse({
//     title: formData.get('title'),
//     release_year: formData.get('release_year'),
//     image: formData.get('image'),
//   });
//
//   console.log('validatedFields', validatedFields)
//
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to Update Movie.',
//     };
//   }
//
//   const { title, release_year, image } = validatedFields.data;
//
//   console.log('title, release_year, image', title, release_year, image)
//
//   try {
//     await sql`
//       UPDATE movies
//       SET title = ${title}, release_year = ${release_year}, image = ${image}
//       WHERE id = ${id}
//     `;
//   } catch (error) {
//     console.error(error)
//     return { message: 'Database Error: Failed to Update Movie.' };
//   }
//
//   console.log('after try catch')
//
//   revalidatePath('/');
//   redirect('/');
// }

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
