import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPictures } from "../services/pictures";
import DisplayPictures from "./Picture";


const AllPictures = ({ refresh, ...props }) => {

    const navigate = useNavigate();

    const [pictures, setPictures] = useState([]);
    const [reverseStatus, setReverseStatus] = useState(false)

    const handleReverse = () => {
    setPictures([...pictures].reverse());
    setReverseStatus(!reverseStatus)
    }

  // GET PICTURES
useEffect(() => {
    //trigger when a post is created
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
    getPictures(token)
        .then((data) => {
        setPictures(data.pictures.reverse()); // Set the posts as reversed
        localStorage.setItem("token", data.token);
        })
        .catch((err) => {
        console.error(err);
        navigate("/login");
        });
    }
  }, [navigate, refresh]); // Pass in the refresh value. If this changes then it reruns this useEffect



    return (
    <div className="feed" role="feed">

        <button className="reverse-btn p-2 mt-2" onClick={handleReverse}>
        {reverseStatus? "See newest first": "See oldest first"} 
        </button>

        {pictures.map((picture) => (
        <DisplayPictures
            title={picture.title}
            url={picture.url}
            key={picture._id}
            user={picture.user}
            alttext={picture.alttext}

        />
        ))}
    
    </div>
    );
}

export default AllPictures;