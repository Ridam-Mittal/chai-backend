import multer from "multer";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage,
})


/*

In the current multer setup, the file is being saved using its original name (file.originalname), which means if two users upload images with the same filename, the second upload will overwrite the first one in the local storage (./public/temp).

Since you are using the same directory and filename (file.originalname) for storing the images, the new image with the same name will replace the old one because there is no mechanism to check or generate unique filenames.

Why this happens:
If two different users upload an image with the same name (e.g., avatar.jpg), the file path will be identical (./public/temp/avatar.jpg), so the first image gets overwritten by the second one.
multer by default doesn’t check if a file with the same name already exists; it just writes to the destination.


Solution: Generate Unique Filenames
To prevent overwriting, you can modify the filename function to generate unique filenames for each uploaded image by appending a timestamp or random value.

*/