import { NextApiRequest, NextApiResponse } from 'next';

import formidable from 'formidable';
import { createWriteStream } from 'fs';

const UPLOADED_FOLDER = './uploads';

export const config = {
  api: {
    bodyParser: false,
  },
};

type Data = {
  name: string;
};

// https://zenn.dev/niccari/articles/f95c0a31ed40a1
const handler = async (req: NextApiRequest, res: NextApiResponse<Data | undefined>) => {
  if (req.method !== 'POST') {
    return;
  }
  if (!req.headers['content-type']?.includes('multipart/form-data')) {
    res.status(400).send(undefined);
    return;
  }
  const form = formidable({ multiples: true, uploadDir: __dirname });

  // Memo:
  // form.parse(req) を呼ぶと、順々にcallbackが呼ばれる模様
  // callbackを設定 -> parseという流れでファイルのhandlingをするのが良さげ?
  // https://qiita.com/dimyasvariant/items/2dc9872684f487f8324d
  form.onPart = (part) => {
    if (part.originalFilename === '' || !part.mimetype) {
      form._handlePart(part);
    } else if (part.originalFilename) {
      const originalFileName = part.originalFilename.startsWith('.')
        ? part.originalFilename.slice(0)
        : part.originalFilename;
      const fileName = `${new Date().getTime()}-${originalFileName}`;
      const stream = createWriteStream(`${UPLOADED_FOLDER}/${fileName}`);

      part.pipe(stream);

      part.on('end', () => {
        console.log(part.originalFilename + ' is uploaded');
        stream.close();

        res.status(200).send({
          name: fileName,
        });
      });
    }
  };

  form.once('error', (e) => {
    res.status(500).send(e);
  });

  form.parse(req, async (err, fields, files) => {
    console.log('Call back of form.parse');
    // if (!Object.hasOwn(files, 'image')) {
    //   throw new Error('imageFile not specified.');
    // }
    // if (err) {
    //   res.statusCode = 500;
    //   res.end();
    //   return;
    // }
    // const images = files['image'];
    // const imageFile = Array.isArray(images) ? images[0] : images;

    // console.log('file size - ' + imageFile.size);
    // // ファイルをなんやかんやする

    // res.status(200).send({
    //   name: 'Uploaded file size - ' + imageFile.size,
    // });
  });
};

export default handler;
