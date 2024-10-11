import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useState, useEffect } from "react";
import { createComment } from "../services/comments";
import Form from "react-bootstrap/Form";
import DisplayComment from "../components/DisplayComment";
import { getComments } from "../services/comments";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import LikeButton from "./LikeButton";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';


function DisplayPictures(props) {
    const formatDate = (date) => {
        const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        hour12: true,
        };
        return new Date(date).toLocaleDateString(undefined, options);
    };
    
    const navigate = useNavigate();
    
    const [comment, setComment] = useState(""); // individual comment
    
    const [allComments, setAllComments] = useState([]); // all comments
    
    const [refreshComments, setRefreshComments] = useState(false); // all comments
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        const loggedIn = token !== null;
        if (loggedIn) {
        getComments(token)
            .then((data) => {
            setAllComments(data.comments);
            setRefreshComments(false);
            localStorage.setItem("token", data.token);
            })
            .catch((err) => {
            console.error(err);
            navigate("/login");
            });
        }
    }, [navigate, refreshComments]);
    
      // set an individual comment into state
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };
    
      // handleSubmit for posting a comment
    const handleSubmit = (event) => {
        event.preventDefault();
        createComment(comment);
        setComment(""); // clears COMMENT field upon submit
        setRefreshComments(true);
    };
    

    const handleClick = () => {
        localStorage.setItem("picture_id", props.picture._id);
    };
    
    const filteredComments = allComments.filter(
        (comment) => comment.picture_id === props.picture._id
    );
    
    return (
        <>
        <Container>
            <Card className="post-card my-3" key={props.picture._id}>
            <Card.Body>
                <Row>
                <Col sm={3} className="text-center">
                <ListGroup.Item>
                <h6 className="fw-bold mt-1">{props.picture.author ? props.picture.author.username : "Unknown User"}</h6> 
                </ListGroup.Item>
                    <Card.Img
                    variant="top"
                    src={props.picture.userPic}
                    className="profile-photo img-fluid" 
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                </Col>
                <Col sm={9} className="d-flex align-items-center">
                    <Card.Text className="fs-5">{props.picture.url}</Card.Text>
                </Col>
                </Row>
            </Card.Body>
    
            <Row className="align-items-center">
                <Col sm={6} className="text-center text-sm-start">
                </Col>
                <Col sm={6} className="text-end">
                <ListGroup.Item className="post-metadata">
                    <span>Posted on {formatDate(props.picture.createdAt)}</span>
                </ListGroup.Item>
                </Col>
            </Row>
    
            <Card.Footer className="text-muted">
                <ListGroup.Item className="post-metadata d-flex align-items-center justify-content-center">
                <LikeButton
                    className=""
                    picture={props.picture}
                    user={props.user}
                    toggleLike={props.toggleLike}
                /> 
                <span className="mx-3">{props.picture.likes.count}</span>
                </ListGroup.Item>
            </Card.Footer>
    
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="message-box">
                <InputGroup>
                    <Form.Control
                    as="textarea"
                    rows={2}
                    onChange={handleCommentChange}
                    onClick={handleClick}
                    value={comment}
                    name="comment"
                    placeholder="Your comment..."
                    />
                    <Button
                    className="btn-sm"
                    value="Submit"
                    variant="primary"
                    type="submit"
                    >
                    Submit
                    </Button>
                </InputGroup>
                </Form.Group>
            </Form>
    
            <Card.Body>
                <div>
                {filteredComments.map((comment) => (
                    <DisplayComment
                    key={comment._id}
                    comment_text={comment.comment}
                    user={comment.user}
                    created_at={formatDate(comment.createdAt)}
                    />
                ))}
                </div>
            </Card.Body>
            </Card>
        </Container>
        </>
    );
    }

    export default DisplayPictures








//     return (
//         <>
//         <div className="PicStyle">
//             <br></br>
//             <br></br>
//             <h2>{props.title}</h2>
//             <br></br>
//             <img src={props.url}></img>
//             <h3>Posted By: {props.user}</h3>
//         </div>
//         </>
//     );
// }

// export default DisplayPictures;