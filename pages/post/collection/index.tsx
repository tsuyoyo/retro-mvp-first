import React, { useState, ChangeEvent } from 'react';

const Home: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('画像がアップロードされました');
        } else {
          console.error('画像のアップロードに失敗しました');
        }
      } catch (error) {
        console.error('エラー:', error);
      }
    }
  };

  return (
    <div>
      <h1>画像アップロード</h1>
      <input type='file' onChange={handleFileChange} accept='image/*' />
      <button type='button' onClick={handleUpload} disabled={!file}>
        アップロード
      </button>
    </div>
  );
};

export default Home;
