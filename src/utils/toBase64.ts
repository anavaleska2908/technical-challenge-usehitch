export const toBase64 = (file?: File) => {
  console.log('file', file)
  if (file === undefined) {
      return null
    } else {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file as File );
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error)
        }
      })
    }

  }
