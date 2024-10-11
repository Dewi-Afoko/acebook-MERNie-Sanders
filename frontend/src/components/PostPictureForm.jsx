import { useState } from "react";
import { createPicture } from "../services/pictures";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


const PostPictureForm = () => {
  const [picture, setPicture] = useState("");
  const [title, setTitle] = useState("");
  const [alttext, setAlttext] = useState("");

  const handlePictureChange = (event) => setPicture(event.target.value);
  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleAlttextChange = (event) => setAlttext(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      url : picture,
      title: title,
      alttext : alttext
    }
    createPicture(payload);
    setPicture(""); // clears message field upon submit
    setTitle(""); // clears message field upon submit
    setAlttext(""); // clears message field upon submit
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Enter Picture URL</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          onChange={handlePictureChange}
          value={picture}
          className="message-box"
          name="message"
          placeholder="Your picture URL..."
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Enter Picture Title</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          onChange={handleTitleChange}
          value={title}
          className="message-box"
          name="message"
          placeholder="Your picture title..."
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Enter Picture Alt-text</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          onChange={handleAlttextChange}
          value={alttext}
          className="message-box"
          name="message"
          placeholder="Your picture alt-text..."
        />
      </Form.Group>

      <Button value="Submit" variant="primary" type="submit">
        Submit
      </Button>

    </Form>
  );
};

export default PostPictureForm;
