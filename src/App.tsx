import './App.css';
import AWS from "aws-sdk";
import { Anonlog } from './AnonLog';
import { useState } from 'react';
import { CheckScale } from './Checker';

function App() {
  const [data, setData] = useState<any>([]);
  const [image, setImage] = useState<string>();
  const [scale, setScale] = useState<string>("initial");
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
        console.log(data);
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
      <h1>Facial analysis</h1>
      <CheckScale data={data} scale={scale} image={image}/>
      <input className='inputFile' type="file" name="fileToUpload" id="fileToUpload" accept="image/*" onChange={ProcessImage} />
    </div>
  );
}
export default App;
/*
{scale === "loading" ? <Loader /> : null}
        {scale === "finished" ? <Result data={data} image={image} /> : null}
*/