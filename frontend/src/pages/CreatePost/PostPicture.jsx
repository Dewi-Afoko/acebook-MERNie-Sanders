import { NavbarComponent } from "../../components/NavbarComponent";
import ExternalPostPicture from "../../components/ExternalPostPicture";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import AllPictures from "../../components/AllPictures";
import { useState, useEffect } from "react";
import { getAllUsers, getUser } from "../../services/users";
import { useNavigate } from "react-router-dom";


export function PostPicture() {
    const [users, setUsers] = useState([]);

    const [user, setUser] = useState({});
  
    const [refresh, setRefresh] = useState(false); // Create a boolean state that will rerender posts when changed
  
    const navigate = useNavigate();
  
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
            localStorage.setItem("user", JSON.stringify(data.user)); // add all user data to local storage
            localStorage.setItem("username", data.user.username); // adds username to local storage
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

    // This toggles the refresh to the opposite state eg true to false or false to true
    const createdPicture = () => {
    setRefresh(prevRefresh => !prevRefresh);
    };

    return(
        <>
        <NavbarComponent/>
        <Container className="vh-100 d-flex justify-content-center align-items-center">
        <Row className="w-100">
        <h2 className="fw-bold text-center mb-4">Post a picture</h2>
        <Col lg={6} md={8} className="mx-auto">
            <Row className="mb-4">
            <Col className="d-flex justify-content-center flex-column">
            <ExternalPostPicture whenPictureCreated={createdPicture}/>
            </Col>
            </Row>
            </Col>
            </Row>
            </Container>
            <AllPictures user={user} postFilter="all" refresh={refresh} />
        </>
    )
}