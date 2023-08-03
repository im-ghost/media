import React, { useState } from 'react';
import { storage } from '../app/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Button, Input } from '@mui/material';
const Uploader = ({ setUrl, url, setName }) => {
  const [dProgress, setProgress] = useState(0);
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const metadata = {
      contentType: '*/*',
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(
      storage,
      'posts/' + `${window.crypto.randomUUID()}${file.name}`
    );
    setName(`${window.crypto.randomUUID()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setProgress(progress);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setUrl(downloadURL);
        });
      }
    );
  };
  const fileInput = React.useRef();
  return (
    <div className="w-full">
      <div className="border-2 animate-fade w-full">
        <div
          className={`h-6 bg-red-900 w-[${dProgress}%] flex justify-center items-center`}
        >
          {Math.floor(dProgress)}%
        </div>
      </div>
      <Input
        type="file"
        onChange={handleImageUpload}
        ref={fileInput}
        className="hidden"
      />
      <Button onClick={() => fileInput.current.click()}>Upload</Button>
    </div>
  );
};

export default Uploader;
