import './App.css';
import AWS from "aws-sdk";
import { Anonlog } from './AnonLog';
import { useState } from 'react';
import { CheckScale } from './Checker';

function App() {
  const [data, setData] = useState<object>([]);
  const [image, setImage] = useState<string>();
  const [scale, setScale] = useState<string>("initial");
  const [Daymode, setDayMode] = useState<string>("");
  const [Nigthmode, setNigthMode] = useState<string>("none");
  const toogleMode = () => {
    if (Daymode === "") {
      setDayMode("none")
      setNigthMode("")
    } else if (Daymode === "none") {
      setDayMode("")
      setNigthMode("none")
    }
  }
  function DetectFaces(imageData: any) {
    var rekognition = new AWS.Rekognition();
    var params = {
      Image: {
        Bytes: imageData
      },
      Attributes: [
        'ALL',
      ]
    };
    rekognition.detectFaces(params, function (err, data: any) {
      if (err) {
        console.log(err, err.stack);
      } // an error occurred
      else {
        setData(data.FaceDetails[0])
        setScale("finished")
      }
    })
  }
  const ProcessImage = (event: any) => {
    const file: any = event.target.files[0];
    console.log(URL.createObjectURL(event.target.files[0]));
    Anonlog();

    var reader = new FileReader();
    reader.onload = (function (theFile) {
      setScale("loading")
      return function (e: any) {
        var image: any = null;
        var jpg = true;
        setImage(e.target.result);
        try {
          image = atob(e.target.result.split("data:image/jpeg;base64,")[1]);
        } catch (e) {
          jpg = false;
        }
        if (jpg === false) {
          try {
            image = atob(e.target.result.split("data:image/png;base64,")[1]);
          } catch (e) {
            alert("Not an image file Rekognition can process");
            return;
          }
        }
        var length = image.length;
        var imageBytes: any = new ArrayBuffer(length);
        var ua = new Uint8Array(imageBytes);
        for (var i = 0; i < length; i++) {
          ua[i] = image.charCodeAt(i);
        }
        DetectFaces(imageBytes);
      };
    })(file);
    reader.readAsDataURL(file);
  }
  return (
    <div className="App">

      <div className="header container-fluid col-md-12" style={Daymode === "" ? { backgroundColor: "#16558F" } : { backgroundColor: "#ffa500" }}>
        <div className='col-md-4 mainTitle'><h1>Facial analysis</h1></div>

        <div className='col-md-4 upload_grp' >
          <label className="custom-file-upload updloadF" htmlFor='fileToUpload' title='image'>
            <input className='inputFile' type="file" name="fileToUpload" id="fileToUpload" accept="image/*" onChange={ProcessImage} />Upload image<i className="bi bi-upload ms-2"></i>
          </label>
        </div>
        <div className='toggleContainer' onClick={toogleMode}>
          <div className='toggleElementLeft' style={{ display: Daymode }}></div>
          <div className='toggleElementRight' style={{ display: Nigthmode }}></div>
        </div>
      </div>
      <CheckScale data={data} scale={scale} image={image} />
      <div className="col-md-12 footer" style={Daymode === "" ? { backgroundColor: "#16558F" } : { backgroundColor: "#ffa500" }}>
        <div className="footerText"> HEI Project - AWS Rekognition</div>
      </div>
    </div>
  );
}
export default App;
/*
{scale === "loading" ? <Loader /> : null}
        {scale === "finished" ? <Result data={data} image={image} /> : null}
*/