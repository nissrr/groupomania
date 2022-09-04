const multer = require('multer')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images')
  },
  filename: (req, file, callback) => {
    const name = file.originalname
      .split(' ')
      .join('_')
      .split('.')
      .slice(0, -1)
      .join()
    const extention = MIME_TYPES[file.mimetype]
    callback(null, name + '-' + Date.now() + '.' + extention)
  },
})

module.exports = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    req.isFileInvalid = !MIME_TYPES[file.mimetype]
    req.isFileInvalid ? callback(null, false) :
    callback(null, true)
  },
}).single('image')
