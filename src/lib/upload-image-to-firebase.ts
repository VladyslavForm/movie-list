import {ref, uploadBytes, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import { storage } from '../../firebase';

export async function uploadImageToFirebase(file: File) {
  const storageRef = ref(storage, `movies/${file.name}`)
  const fileBlob = new Blob([file], { type: file.type })
  const uploadTask = uploadBytesResumable(storageRef, fileBlob)

  uploadTask.on("state_changed",
    (snapshot) => {
      const progress =
        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    },
    (error) => {
      console.log('error inside uploadTask.on', error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('downloadURL', downloadURL)
      });
    }
  );

  // const url = await getDownloadURL(storageRef)
  return 'https://dummy.com';
}
