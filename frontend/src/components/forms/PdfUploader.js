import styled from "styled-components";
import colors from "../../constants/colors";
import { useState, useRef, } from "react";
import { FiUpload } from "react-icons/fi";
import { getExtention } from "../../utils/funs";
import http from "../../services/http";
import baseUrl from "../../services/baseUrl";
import routes from "../../constants/routes";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import storage from "../../services/firebase/storage"

const CC = styled.div`
  background-color: ${colors.light};
  width: 20rem;
  height: 20rem;
  border-radius: 1rem;
  overflow: hidden;
  margin-top:1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  & > h1 {
    color: #e91e63;
  }

  & > input {
    opacity: 0;
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    :hover {
      cursor: pointer;
    }
  }

  & > svg {
    position: absolute;
    z-index: 1;
    font-size: 3rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    color: ${colors.gray1};
  }
`;

const H = styled.div`
  margin-bottom: 1rem;
`;
const Label = styled.label`
  font-size: 1.7rem;
  text-transform: capitalize;
  & > span {
    color: red;
    margin-left: 1rem;
  }
`;
const Lm = styled.div`
  color: ${colors.gray1};
`;
const C = styled.div`
  margin-top: 2rem;
`;
const Mi = styled.div`
  color: red;
  margin-top: 0.4rem;
`;

const Cv = styled.div`
  background: #eee;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  z-index: 23;
`;

const Bar = styled.div`
  width: 90%;
  height: 1rem;
  background-color: #2196f334;
  margin-top: 6rem;
  z-index: 24;
  border-radius: 4rem;
  overflow: hidden;
`;
const Bg = styled.div`
  width: ${({ prog }) => (prog ? prog + "%" : "0%")};
  height: 100%;
  background-color: #2196f3;
`;

export default function PdfUploader({ setPathPdfFile, setPdfSize }) {

  const pdffile = useRef();
  const [err, setErr] = useState(false);
  const [progress, setProgress] = useState();

  const handleChange = async () => {

    if (pdffile.current.files && pdffile.current.files[0]) {

      const file = pdffile.current.files[0];

      setPdfSize(file.size);

     
      if (getExtention(file.name) === "pdf") {

        const storageRef = ref(storage, 'pdfs/' + file.name);

        const uploadTask = uploadBytesResumable(storageRef, file,  { contentType: file.type });

          // Listen for state changes, errors, and completion of the upload.
          uploadTask.on('state_changed', (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progressUploading = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progressUploading)
            
          
            switch (snapshot.state) {
                case 'paused':
                    // console.log('Upload is paused');
                    break;
                case 'running':
                    // console.log('Upload is running: ', progress);
                    break;
            }
        },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        alert(error.message)
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  setPathPdfFile(downloadURL);
  
                });
            })


        
      } else setErr(true);
    }
  };

  return (
    <C>
      <H>
        <Label>
          pdf file
          <span>*</span>
        </Label>
        <Lm>upload pdf file for this book</Lm>
      </H>
        {progress && <h2>
          {progress < 100 ? progress +" Uploading..." : "File Uploaded"} 
      </h2>}
        
      <CC>
        <FiUpload />
        <input
          type='file'
          name='pdffile'
          ref={pdffile}
          onChange={handleChange}
        />
      </CC>
      {err && <Mi> upload pdf file </Mi>}
    </C>
  );
}
