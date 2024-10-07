import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../services/posts";
import { getComments } from "../../services/comments";
import Post from "../../components/Post";
import CreatePostForm from "../../components/CreatePostForm";
import { getAllUsers} from "../../services/users";
import { getUser } from "../../services/users";
import UserProfile from "../../components/UserProfile";
import { NavbarComponent } from "../../components/NavbarComponent";
import DisplayComment from "../../components/DisplayComment";

export function FeedPage() {

  const [posts, setPosts] = useState([]);

  const [users, setUsers] = useState([]);

  const [user, setUser] = useState({});

  const [comments, setComments] = useState([]);
  
  const navigate = useNavigate();
  const [postReverse, setPostReverser] = useState(true); // Determines which button to render based on postReverse status
  const handleReverse = () => {
    setPostReverser(true); // reverse postss from default order
  }
  const handleUnreverse = () => {
    setPostReverser(false); // returns to default order
  }

  // GET POSTS
  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getPosts(token)
        .then((data) => {
          setPosts(data.posts);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
      }
    }, [navigate, posts]); // added posts argument to re-render page upon post

     // GET COMMENTS
  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getComments(token)
        .then((data) => {
          setComments(data.comments);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
      }
    }, [navigate, comments]);

    // GET USERS
    useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getAllUsers(token)
        .then((data) => {
          setUsers(data.users);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
      }
    }, [navigate]);

    // GET USER
    useEffect(() => {
      const token = localStorage.getItem("token");
      const loggedIn = token !== null;
      if (loggedIn) {
        getUser(token)
          .then((data) => {
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user)) // add all user data to local storage !! INCLUDES PASSWORD !!
            localStorage.setItem("username", data.user.username) // adds username to local storage
            localStorage.setItem("token", data.token);
          })
          .catch((err) => {
            console.error(err);
            navigate("/login");
          });
        }
      }, [navigate]);


  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  // const filteredComments = comments.filter((comment) => comment.post_id === post._id);

  return (
    <>
    <NavbarComponent />
      <h2>Posts</h2>
      <CreatePostForm />
      {postReverse ? 
      ( // conditional rendering based on postReverse status being true, renders reversed initially
      <div className="feed" role="feed">
          {[...posts].reverse().map((post) => (
          <Post post={post} key={post._id} comment="hello"/>

        ))}
        <button onClick={handleUnreverse}>Unreverse</button> {/*Button reverses currently displayed order*/}
      </div>): 

      ( // conditional rendering based on postReverse status being false
      <div className="feed" role="feed">
        {posts.map((post) => (
      <Post post={post} key={post._id}/>
        ))}
        <button onClick={handleReverse}>Reverse</button> {/*Button reverses currently displayed order*/}
      </div>)
}

      <div>
      {filteredComments.map((comment) => (
        <DisplayComment key={comment.id} comment_text={comment.comment} />
      ))}
      </div>


      <h2>All User Profiles</h2>
      <div>
        {users.map((user, index) => (
            <UserProfile user={user} key={index} />
          ))}
        {/* {users.map((user) => (
            <UserProfile user={user} key={user._id} />
          ))} */}
      </div>
      <br />

      <h2>Current User Profile</h2>
      <div>
        <img src={user.imgURL}></img> {/* Displays the img from the imgURL property of current user*/}
        {user && <UserProfile user={user} key={user._id} />}
      </div>
    </>
  );
}


