import React, { useState, ChangeEvent } from 'react';

const Home: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string>('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = async () => {
        const base64Text = reader.result;
        const task = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ img: base64Text }),
        });
        const url = (await task.json()).downloadUrl;
        setDownloadUrl(url);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = async () => {
    //     const base64Text = reader.result;
    //     console.log(base64Text);
    //     const response = await fetch('/api/upload', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ img: base64Text }),
    //     });
    //     console.log(response.status);
    //   };
    //   reader.readAsDataURL(file);
    // }
  };

  return (
    <div>
      <h1>画像アップロード</h1>
      <input type='file' onChange={handleFileChange} accept='image/*' />
      <button type='button' onClick={handleUpload} disabled={!file}>
        アップロード
      </button>
      <div>{downloadUrl}</div>
    </div>
  );
};

export default Home;
