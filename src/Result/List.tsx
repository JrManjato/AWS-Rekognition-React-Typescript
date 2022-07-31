import CSS from 'csstype';
import { useState } from 'react';
interface Props {
    data: any,
   // ProgressionResult: CSS.Properties<0 | (string & {}), string & {}> ,
   icon: string | undefined,
    code: string
}
export const List: React.FC<Props> = ({data, code, icon}) => {
    const ProgressionResult: CSS.Properties = {
        position: "absolute",
        top: 0,
        width: data?.Confidence + "%",
        border: 1+"px solid black",
        backgroundColor: "rgb(0, 179, 224)",
        height: 18 + "px",
    };
    const [loadMore, setLoadMore] = useState<string>("bi bi-caret-left-fill");
    const [cacher, setCacher] = useState<string>("cacher");
    const stater = () => {
        if (loadMore === "bi bi-caret-left-fill") {
            setLoadMore("bi bi-caret-down-fill");
            setCacher("")
        }
        else {
            setLoadMore("bi bi-caret-left-fill");
            setCacher("cacher")
        }
    }
    const spanDescription = () =>{
        if (data.Value === false) {
            return 'No'
        }
        else if(data.Value === true){
            return 'Yes'
        }
        else if(data.Value === 'Female'){
            return 'Female'
        }
        else if(data.Value === 'Male'){
            return 'Male'
        }
    }
    return (
        <ul onClick={stater}>
            <h2><i className={icon + " me-3"}></i>{code}<i className={loadMore}></i></h2>
            <span>{spanDescription()}</span><span className="pourcentage">{data.Confidence?.toFixed(2)}%</span>
            <div className="AllProg" >
                <div className="progression"></div>
                <div className="progressionResult" style={ProgressionResult}></div>
            </div>
            {cacher === "cacher" ? null : <div>
                <li>Confidence: {data.Confidence}</li>
                <li>Value: {data.Value?.toString()}</li>
            </div>}
        </ul>
    )
}