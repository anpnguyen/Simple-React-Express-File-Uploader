import React, { useState } from "react";
import Axios from "axios";

const ImageUpload = () => {
  const [file, setFile] = useState("");
  const [uploadedFile, setUploadedFile] = useState({});
  const [previewItem, setPreviewItem] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await Axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnChange = e => {
    setFile(e.target.files[0]);
    setPreviewItem({ image: URL.createObjectURL(e.target.files[0]) });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="form-group">
          <label htmlFor="imageUpload">
            Please choose a file to upload
          </label>
          <input
            type="file"
            className="form-control-file"
            id="imageUpload"
            accept="image/x-png,image/gif,image/jpeg"
            onChange={handleOnChange}
          />
          <button className="btn btn-lg btn-primary mt-2">Submit </button>
        </div>
      </form>

      {previewItem && (
        <div>
          <img src={previewItem.image} alt="uploaded file" />
        </div>
      )}

      {uploadedFile.fileName && <div>uploaded {uploadedFile.fileName}</div>}
    </>
  );
};

export default ImageUpload;
