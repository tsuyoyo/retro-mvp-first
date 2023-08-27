import { NextApiRequest, NextApiResponse } from 'next';

import { storage } from 'helpers/firebase';
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';

export const config = {
  api: {
    // bodyParser: false,
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
};

type Data = {
  name: string;
  downloadUrl: string;
};

type Error = {
  message: string;
};

const generateStorageFileRef = (fileName: string) => ref(storage, `/images/${fileName}`);

const uploadImageToFirebase = async (
  image: File | Buffer,
  storageReference: ReturnType<typeof ref>,
  metadata?: Record<string, string>,
) => {
  const result = await uploadBytes(storageReference, image, metadata);
  const downloadUrl = await getDownloadURL(storageReference);
  console.log(`name: ${result.metadata.name}, downloadUrl: ${downloadUrl}`);
  return {
    result,
    downloadUrl,
  };
};

// Ref: https://dev.classmethod.jp/articles/node-js-base64-encoded-image-to-s3/
const decodeBase64Data = (encodedData: string) => {
  return {
    data: Buffer.from(encodedData.replace(/^data:\w+\/\w+;base64,/, ''), 'base64'),
    extension: encodedData.slice(encodedData.indexOf('/') + 1, encodedData.indexOf(';')),
    contentType: encodedData.slice(encodedData.indexOf(':') + 1, encodedData.indexOf(';')),
  };
};

const handleRequestByJson = async (req: NextApiRequest, res: NextApiResponse<Data | Error>) => {
  const { data, extension, contentType } = decodeBase64Data(req.body.img);

  // TODO: ここで画像を圧縮できるとよさそう
  // https://www.npmjs.com/package/browser-image-compression
  const fileName = `${new Date().getTime()}.${extension}`;
  const imageFileRef = generateStorageFileRef(fileName);
  const metadata = {
    contentType,
  };

  try {
    const { result, downloadUrl } = await uploadImageToFirebase(data, imageFileRef, metadata);
    res.status(200).send({
      name: result.ref.name,
      downloadUrl,
    });
  } catch (e) {
    res.status(500);
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data | Error>) => {
  if (req.method !== 'POST') {
    res.status(400).send({ message: `${req.method} is not acceptable` });
  } else if (req.headers['content-type']?.includes('application/json')) {
    return handleRequestByJson(req, res);
  } else {
    res.status(400).send({ message: 'Unexpected request was sent' });
  }
};

export default handler;
