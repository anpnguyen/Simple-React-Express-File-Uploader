import React, { useState } from "react";
import Axios from "axios";
// import axios from 'axios'

const FileUpload = () => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [uploadPercentage,setUploadPercentage] = useState(0)

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    

    try {
        const res = await Axios.post('/upload', formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
              },
              onDownloadProgress: progressEvent=>{
                  setUploadPercentage(parseInt(Math.round((progressEvent.loaded *100)/(progressEvent.total))))
              }
        });
        const {fileName, filePath} = res.data
        setUploadedFile({fileName, filePath})
        console.log('file uploaded')
        
        

    } catch (err) {
        if(err.response.status === 500){
            console.log(err)
        } else{
            console.log(err.response.msg)
        }
        
    }
  };

  const handleOnChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    console.log(e.target.files);
  };

  return (
    <div className="custom-file mb-4">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          className=""
          id="imageUpload"
          onChange={handleOnChange}
          placeholder=""
        />
        <label className="" htmlFor="imageUpload">
          {fileName}
        </label>

        <br />
        <br />
        <button>Submit </button>
      </form>

      {uploadedFile.fileName ? uploadedFile.fileName : <h1>no file uploaded</h1>}

      <h1>{uploadPercentage}</h1>
    </div>
  );
};

export default FileUpload;
