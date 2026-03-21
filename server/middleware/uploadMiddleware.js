const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// Ensure uploads directories exist
const videoDir = path.join(__dirname, '..', 'public', 'uploads', 'videos');
const documentDir = path.join(__dirname, '..', 'public', 'uploads', 'documents');

if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir, { recursive: true });
if (!fs.existsSync(documentDir)) fs.mkdirSync(documentDir, { recursive: true });

const createStorage = (targetDir) => multer.diskStorage({
  destination: (req, file, cb) => cb(null, targetDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  }
});

const videoFilter = (req, file, cb) => {
  const allowed = /mp4|mov|avi|mkv|webm/i;
  const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
  if (allowed.test(ext)) cb(null, true);
  else cb(new Error('Only video files allowed'), false);
};

const documentFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.pdf') cb(null, true);
  else cb(new Error('Only PDF documents allowed'), false);
};

const uploadVideo = multer({
  storage: createStorage(videoDir),
  fileFilter: videoFilter,
  limits: { fileSize: 2 * 1024 * 1024 * 1024 }
});

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const isVideo = /mp4|mov|avi|mkv|webm/i.test(path.extname(file.originalname).toLowerCase());
      cb(null, isVideo ? videoDir : documentDir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${uuidv4()}${ext}`);
    }
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const isVideo = /mp4|mov|avi|mkv|webm/i.test(ext);
    const isDoc = ext === '.pdf';
    if (isVideo || isDoc) cb(null, true);
    else cb(new Error('Only Video and PDF files allowed'), false);
  },
  limits: { fileSize: 2 * 1024 * 1024 * 1024 }
});

module.exports = { uploadVideo, upload };
