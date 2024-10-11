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
    
        // GET POSTS
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
    
        // // LIKE POST
        // const toggleLike = (postId) => {
        // const token = localStorage.getItem("token");
        // if (token) {
        //     updatePost(postId)
        //     .then((updatedPost) => {
        //         // Update the posts state with the updated post
        //         setPosts((prevPosts) => {
        //         return prevPosts.map((post) => {
        //             if (post._id === updatedPost.post._id) {
        //               return updatedPost.post; // If the post is the updated one, replace it
        //             } else {
        //               return post; // Otherwise, leave it as is
        //             }
        //         });
        //         });
        //     })
        //     .catch((err) => {
        //         console.error("Error toggling like:", err);
        //     });
        // }
        // };
    
        if (props.pictureFilter === "all") {
        return (
            <div className="feed" role="feed">
    
            <button className="reverse-btn p-2 mt-2" onClick={handleReverse}>
                {reverseStatus? "See newest first": "See oldest first"} 
            </button>
    
            {pictures.map((picture) => (
                <DisplayPictures
                picture={picture}
                key={picture._id}
                user={props.user}
                // toggleLike={toggleLike}
                />
            ))}
        
            </div>
        );
        } else if (props.pictureFilter === "currentUser") {
        const currentUsersPictures = pictures.filter((picture) => picture.author._id === props.user._id)
        return (
            <div className="feed" role="feed">
            <button className="reverse-btn p-2 mt-2" onClick={handleReverse}>
                {reverseStatus? "See newest first": "See oldest first"}  
            </button>
            {currentUsersPictures.map((picture) => (
                <DisplayPictures
                picture={picture}
                key={picture._id}
                user={props.user}
                // toggleLike={toggleLike}
                />
            ))}
            </div>
    );
        }
    
    };

    export default AllPictures;