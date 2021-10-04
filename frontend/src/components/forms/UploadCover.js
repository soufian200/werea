import styled from "styled-components";
import { AiOutlineUpload } from "react-icons/ai";
import colors from "../../constants/colors";
import { useState, useRef, useEffect } from "react";
import baseUrl from "../../services/baseUrl";
import http from "../../services/http";
import routes from "../../constants/routes";
import { getExtention } from "../../utils/funs";
import storage from "../../services/firebase/storage"
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";

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
const C = styled.div`
  margin-top: 2rem;
`;
const Lm = styled.div`
  color: ${colors.gray1};
`;
const Cover = styled.div`
  width: 20rem;
  height: 30rem;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  background: ${({ url }) => !url && colors.light};
  background-image: url(${({ url }) => url});
  margin-top:1rem;

  & > svg {
    position: absolute;
    z-index: 1;
    font-size: 3rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
const UpC = styled.input`
  /* background-color: red; */
  opacity: 0;
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  :hover {
    cursor: pointer;
  }
`;
const Mi = styled.div`
  color: red;
  /* text-transform: capitalize; */
  margin-top: 0.4rem;
`;


export default function UploadCover({ name, coverurl, setCoverurl }) {

  const fileInput = useRef();
  const extentions = ["jpg", "png", "jpeg"];
  const [err, setErr] = useState(false);
  const [progress,setProgress] = useState()

  function resetFileinput() {
    setCoverurl(null);
    fileInput.current.value = null;
    return true;
  }

  const handleChange = async () => {

    if (fileInput.current.files && fileInput.current.files[0]) {
      let file = fileInput.current.files[0];

      const uri = URL.createObjectURL(file)
      setCoverurl(uri);
      
      
      
      // const fd = new FormData();
      // fd.append("cover", img);
      
      const isValid = extentions.find((e) => e == getExtention(file.name));
      if (isValid) {
        try {
          
          
          const storageRef = ref(storage, 'covers/' + file.name);

          const uploadTask = uploadBytesResumable(storageRef, file,  { contentType: file.type });

          // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed', (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progressUploading = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progressUploading)
          
          console.log('Upload is ' + progress + '% done');
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
                setCoverurl(downloadURL);

              });
          })
          
        } catch (ex) {
          console.log(ex);
          
          // setErr(true);
          
        }
      } else {
        setErr(true);
        
      }
    }
  };

  useEffect(() => {
    resetFileinput();
  }, []);

  return (
    <C>
      <H>
        <Label>
          cover
          <span>*</span>
        </Label>
        <Lm>upload a cover for the book</Lm>
      </H>
      {progress && <h2>
        {progress < 100 ? progress + " Uploading..." : "File Uploaded"} 
      </h2>}
      <Cover>
        {coverurl && <img src={coverurl} />}
        <UpC type='file' name={name} ref={fileInput} onChange={handleChange} />
        <AiOutlineUpload />
      </Cover>
      {err && <Mi> Try another img with extentions like: "jpg, png, jpeg" </Mi>}
    </C>
  );
}
