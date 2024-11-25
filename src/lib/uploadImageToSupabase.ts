import {supabase} from '../../supabaseClient'

export async function uploadImageToSupabase(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}.${fileExt}`
  const filePath = `${fileName}`

  const { data, error } = await supabase.storage
    .from('movies')
    .upload(filePath, file)

  if (error) {
    throw error
  }

  const { data: publicUrlData } = supabase.storage
    .from('movies')
    .getPublicUrl(filePath)

  return publicUrlData.publicUrl
}
