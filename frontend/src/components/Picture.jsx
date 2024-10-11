function DisplayPictures(props) {
    return (
        <>
        <div className="PicStyle">
            <br></br>
            <br></br>
            <h2>{props.title}</h2>
            <br></br>
            <img src={props.url}></img>
            <h3>Posted By: {props.user}</h3>
        </div>
        </>
    );
}

export default DisplayPictures;