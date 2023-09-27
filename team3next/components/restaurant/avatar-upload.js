// pages/index.js
import React, { useState } from 'react';
import Avatar from 'react-avatar-edit';

function Home() {
  const [preview, setPreview] = useState(null);
  const src = './example/einshtein.jpg';

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (preview) => {
    setPreview(preview);
  };

  const onBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 71680) {
      alert('File is too big!');
      elem.target.value = '';
    }
  };

  return (
    <div>
      <Avatar
        width={390}
        height={295}
        onCrop={onCrop}
        onClose={onClose}
        onBeforeFileLoad={onBeforeFileLoad}
        src={src}
      />
      <img src={preview} alt="Preview" />
    </div>
  );
}

export default Home;
