import CSS from 'csstype';
import { List } from "./List";
import { useState } from "react";

interface Props {
    image: string | undefined,
    data: any
}
const Result: React.FC<Props> = ({ image, data }) => {
    const [listSize, setListSize] = useState<number>(2);
    const [listSize2, setListSize2] = useState<number>(3);
    const [cacher, setCacher] = useState<string>("cacher");
    const [loadMore, setLoadMore] = useState<string>("bi bi-chevron-right");
    const [loadMore1, setLoadMore1] = useState<string>("bi bi-chevron-right");
    const [loadMore2, setLoadMore2] = useState<string>("bi bi-chevron-right");
    const tableToggle = () => {
        if (listSize === 2) {
            setListSize(8)
            setLoadMore("bi bi-chevron-down");
        }
        else {
            setListSize(2)
            setLoadMore("bi bi-chevron-right");
        }
    }
    const cacherToggle = () => {
        if (cacher === "cacher") {
            setCacher("")
            setLoadMore1("bi bi-chevron-down");
        }
        else {
            setCacher("cacher")
            setLoadMore1("bi bi-chevron-right");
        }
    }
    const LandmarksToggle = () => {
        if (listSize2 === 3) {
            setListSize2(30)
            setLoadMore2("bi bi-chevron-down");
        }
        else {
            setListSize2(3)
            setLoadMore2("bi bi-chevron-right");
        }
    }
    const BoudingBox: CSS.Properties = {
        position: 'absolute',
        left: data?.BoundingBox?.Left * 450 + "px",
        top: data?.BoundingBox?.Top * 450 + "px",
        width: data?.BoundingBox?.Width * 450 + "px",
        height: data?.BoundingBox?.Height * 450 + "px",
        border: "2px solid green"
    };
    return (
        <>
            <div className="result container-fluid col-md-12 rsinfo">
                <div className='image col-md-4' style={{ position: 'relative' }} >
                    <div style={BoudingBox} className='imagebox'>
                    </div>
                    <img src={image} width='450px' height='450px' alt='The Updating image' />
                </div>
                <div className='info container-fluid col-md-8'>
                    <div className="info_elt col-md-2 me-1">
                        <ul className="age">
                            <h2><i className="bi bi-arrow-down-up me-3 ms-2"></i>AgeRange</h2>
                            <li><i className="bi bi-arrow-up me-2 success ms-2"></i>Hight: {data?.AgeRange?.High}</li>
                            <li><i className="bi bi-arrow-down me-2 ms-2"></i>Low: {data?.AgeRange?.Low}</li>
                        </ul>
                        <List data={data?.EyesOpen} code={"EyesOpen"} icon={"bi bi-eye"} />
                        <List data={data?.MouthOpen} code={"MouthOpen"} icon={"bi bi-usb-c"} />
                        <div onClick={cacherToggle} className="min-table">
                            <h2 className="text-center">BoudingBox</h2>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th><i className={loadMore1}></i>Details</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Height</td>
                                        <td>{data?.BoundingBox?.Height}</td>
                                    </tr>
                                    <tr>
                                        <td>Left</td>
                                        <td>{data?.BoundingBox?.Left}</td>
                                    </tr>
                                    <tr className={cacher}>
                                        <td>Top</td>
                                        <td>{data?.BoundingBox?.Top}</td>
                                    </tr>
                                    <tr className={cacher}>
                                        <td>Width</td>
                                        <td>{data?.BoundingBox?.Width}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div className="info_elt col-md-2 ">
                        <List data={data?.Gender} code={"Gender"} icon={"bi bi-gender-ambiguous"} />
                        <List data={data?.Sunglasses} code={"Sunglasses"} icon={"bi bi-sunglasses"} />
                        <List data={data?.Mustache} code={"Mustache"} icon={"bi bi-usb-c"} />

                        <div onClick={tableToggle} className="min-table">
                            <h2 className="text-center">Emotions</h2>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th><i className={loadMore + " me-2"}></i>Type</th>
                                        <th>Confidence</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.Emotions?.slice(0, listSize).map((elt: any) => <tr key={elt.Type}> <td>{elt.Type}</td> <td>{elt.Confidence}</td></tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="info_elt col-md-2 ms-1">
                        <List data={data?.Smile} code={"Smile"} icon={"bi bi-emoji-smile"} />
                        <List data={data?.Eyeglasses} code={"Eyeglasses"} icon={"bi bi-eyeglasses"} />
                        <List data={data?.Beard} code={"Beard"} icon={"bi bi-usb-c"} />
                        <div className="min-table">
                            <h2 className="min-title text-center">Quality</h2>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Details</th>
                                        <th>Confidence</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>Brightness</td> <td>{data?.Quality?.Brightness}</td></tr>
                                    <tr><td>Sharpness</td> <td>{data?.Quality?.Sharpness}</td></tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
            <div className="container-fluid col-md-12 result">
                <div className="container col-md-4 underImg me-2">
                    <div className="pose">
                        <h2 className="text-center">Pose</h2>
                        <table className="table table-bordered table-pose">
                            <thead>
                                <tr>
                                    <th>Details</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>.Pitch</td>
                                    <td>{data?.Pose?.Pitch}</td>
                                </tr>
                                <tr>
                                    <td>Roll</td>
                                    <td>{data?.Pose?.Roll}</td>
                                </tr>
                                <tr>
                                    <td>Yaw</td>
                                    <td>{data?.Pose?.Yaw}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div>
                        {/* <h4>Confidence : {data?.Confidence}</h4>  */}
                    </div>
                </div>
                <div className="col-md-8 landMarks" onClick={LandmarksToggle}>
                    <h2 className="text-center">Landmarks</h2>
                    <table className="table table-bordered land_Table">
                        <thead>
                            <tr>
                                <th><i className={loadMore2 + " me-2"}></i>Type</th>
                                <th>X</th>
                                <th>Y</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.Landmarks?.slice(0, listSize2).map((elt: any) => <tr key={elt.Type}><td>{elt.Type}</td><td>{elt.X} </td><td>{elt.Y}</td></tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Result;  