import multer from 'multer';
import path from 'path';

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("ingresando")
    cb(null, 'src/uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

export default upload;
