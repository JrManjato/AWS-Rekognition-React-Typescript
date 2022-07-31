import "./Loading.css";
const Loader: React.FC<any> = ({ }) => {
    return (
        <div className="AllLoading">
            <div className="imageLoader col-md-4">
                <div >Loading image ... </div>
                <div className="loader"></div>
            </div>
            <div className="infoLoader col-md-8">
                <div >Loading informations ... </div>
                <div className="loader"></div>
            </div>
        </div>
    );
};

export default Loader;