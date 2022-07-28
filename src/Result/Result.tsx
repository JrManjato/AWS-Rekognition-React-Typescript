import "./Result.css";
interface Props {
    image: string | undefined,
    data: any
}
const Result: React.FC<Props> = ({image, data}) => {
    return (
        <div className="result">
            <div className='image container col-md-4'>
                <img src={image} width='400px' height='500px' />
            </div>
            <div className='info container col-md-8'>
                <ul>
                    <h2>BoudingBox</h2>
                    <li>Height: {data?.BoundingBox?.Height}</li>
                    <li>Left: {data?.BoundingBox?.Left}</li>
                    <li>Top: {data?.BoundingBox?.Top}</li>
                    <li>Width: {data?.BoundingBox?.Width}</li>
                </ul>
                <ul>
                    <h2>AgeRange</h2>
                    <li>Low: {data?.AgeRange?.Low}</li>
                    <li>Hight: {data?.AgeRange?.High}</li>
                </ul>
                <ul>
                    <h2>Smile</h2>
                    <li>Confidence: {data?.Smile?.Confidence}</li>
                    <li>Value: {data?.Smile?.Value.toString()}</li>
                </ul>
                <ul>
                    <h2>Eyeglasses</h2>
                    <li>Confidence: {data?.Eyeglasses?.Confidence}</li>
                    <li>Value: {data?.Eyeglasses?.Value.toString()}</li>
                </ul>
                <ul>
                    <h2>Sunglasses</h2>
                    <li>Confidence: {data?.Sunglasses?.Confidence}</li>
                    <li>Value: {data?.Sunglasses?.Value.toString()}</li>
                </ul>
                <ul>
                    <h2>Gender</h2>
                    <li>Confidence: {data?.Gender?.Confidence}</li>
                    <li>Value: {data?.Gender?.Value}</li>
                </ul>
                <ul>
                    <h2>Beard</h2>
                    <li>Confidence: {data?.Beard?.Confidence}</li>
                    <li>Value: {data?.Beard?.Value.toString()}</li>
                </ul>
                <ul>
                    <h2>Mustache</h2>
                    <li>Confidence: {data?.Mustache?.Confidence}</li>
                    <li>Value: {data?.Mustache?.Value.toString()}</li>
                </ul>
                <ul>
                    <h2>EyesOpen</h2>
                    <li>Confidence: {data?.EyesOpen?.Confidence}</li>
                    <li>Value: {data?.EyesOpen?.Value.toString()}</li>
                </ul>
                <ul>
                    <h2>MouthOpen</h2>
                    <li>Confidence: {data?.MouthOpen?.Confidence}</li>
                    <li>Value: {data?.MouthOpen?.Value.toString()}</li>
                </ul>
                <ul>
                    <h2>Emotions</h2>
                    <ul>
                        {data?.Emotions?.map((elt: any) => <li key={elt.Type}>{elt.Type}, {elt.Confidence}</li>)}
                    </ul>
                </ul>
                <ul>
                    <h2>Landmarks</h2>
                    <ul>
                        {data?.Landmarks?.map((elt: any) => <li key={elt.Type}>Type: {elt.Type}, X: {elt.X}, Y: {elt.Y}</li>)}
                    </ul>
                </ul>
                <ul>
                    <h2>Pose</h2>
                    <li>Pitch: {data?.Pose?.Pitch}</li>
                    <li>Roll: {data?.Pose?.Roll}</li>
                    <li>Yaw: {data?.Pose?.Yaw}</li>
                </ul>
                <ul>
                    <h2>Quality</h2>
                    <li>Brightness: {data?.Quality?.Brightness}</li>
                    <li>Sharpness: {data?.Quality?.Sharpness}</li>
                </ul>
                <ul>
                    <h2>Confidence</h2>
                    <li>{data?.Confidence}</li>
                </ul>
            </div>
        </div>
    );
};

export default Result;