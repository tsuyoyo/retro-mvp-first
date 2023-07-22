import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  projectId: 'your-project-id',
  keyFilename: 'path/to/serviceAccountKey.json',
});
const bucket = storage.bucket('your-bucket-name');

const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({ dest: 'uploads/' });

// const router = createRouter<NextApiRequest, NextApiResponse>();
// router.use(uploadMiddleWare);
// router.post((req, res) => {});

// export default router;

const uploadHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('aaaaa');

  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  // https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430
  // https://serip39.hatenablog.com/entry/2020/08/27/083000

  // https://zenn.dev/niccari/articles/f95c0a31ed40a1

  console.log('content-type');
  console.log(req.headers['content-type']);
  console.log('req.body');
  console.log(req.body);

  upload.single('image');

  // try {

  // await upload.single('image')(req, res, () => {});
  //   const file = req.file;

  //   if (!file) {
  //     res.status(400).send('アップロードされた画像がありません');
  //     return;
  //   }

  //   const blob = bucket.file(file.originalname);
  //   const blobStream = blob.createWriteStream();

  //   blobStream.on('error', (error) => {
  //     console.error('エラー:', error);
  //     res.status(500).send('画像のアップロード中にエラーが発生しました');
  //   });

  //   blobStream.on('finish', () => {
  //     console.log('画像がFirebase Storageにアップロードされました');
  //     res.send(200);
  //   });

  //   blobStream.end(file.buffer);
  // } catch (error) {
  //   console.error('エラー:', error);
  //   res.status(500).send('サーバーエラーが発生しました');
  // }
};

// export default uploadHandler;
