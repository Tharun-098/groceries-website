import multer, { diskStorage } from "multer";

export const upload=multer({storage:diskStorage({})})

// You're creating an upload instance using multer().
// You pass diskStorage({}) with an empty configuration object, which means:
// destination is not set, so multer will use its default (system temp folder).
// filename is not set, so multer gives each file a random name without preserving the original name.
// ✅ You're importing the multer package, which helps with handling file uploads.
// ✅ You're also importing diskStorage (a helper method in multer) that lets you configure how files are saved on disk (your server).