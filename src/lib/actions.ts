'use server'

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

export async function uploadImageToFirebase(file: File) {
  const storageRef = ref(storage, `movies/${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}

const FormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: 'Please enter a movie title.' }),
  release_year: z.coerce
    .number()
    .gte(1900, { message: 'Release year must be 1900 or later.' }),
  image: z.string().url({ message: 'Please provide a valid image URL.' }),
});

const CreateMovie = FormSchema.omit({ id: true });
const UpdateMovie = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    title?: string[];
    release_year?: string[];
    image?: string[];
  };
  message?: string | null;
};

export async function createMovie(prevState: State, formData: FormData) {
  const validatedFields = CreateMovie.safeParse({
    title: formData.get('title'),
    release_year: formData.get('release_year'),
    image: formData.get('image'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Movie.',
    };
  }

  const { title, release_year, image } = validatedFields.data;

  try {
    await sql`
      INSERT INTO movies (title, release_year, image)
      VALUES (${title}, ${release_year}, ${image})
    `;
  } catch (error) {
    console.error(error)
    return {
      message: 'Database Error: Failed to Create Movie.',
    };
  }

  revalidatePath('/');
  redirect('/');
}

export async function updateMovie(id: string, prevState: State, formData: FormData) {
  const validatedFields = UpdateMovie.safeParse({
    title: formData.get('title'),
    release_year: formData.get('release_year'),
    image: formData.get('image'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Movie.',
    };
  }

  const { title, release_year, image } = validatedFields.data;

  try {
    await sql`
      UPDATE movies
      SET title = ${title}, release_year = ${release_year}, image = ${image}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error(error)
    return { message: 'Database Error: Failed to Update Movie.' };
  }

  revalidatePath('/');
  redirect('/');
}

export async function deleteMovie(id: string) {
  try {
    await sql`DELETE FROM movies WHERE id = ${id}`;
    revalidatePath('/');
    return { message: 'Deleted Movie.' };
  } catch (error) {
    console.error(error)
    return { message: 'Database Error: Failed to Delete Movie.' };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log(formData)
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
