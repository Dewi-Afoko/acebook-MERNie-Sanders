import { useState } from "react";
import { createPicture, uploadToImgBB } from "../services/pictures";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ExternalPostPicture = () => {
    const [pictureFile, setPictureFile] = useState(null); // Note: File, not picture/url
    const [title, setTitle] = useState("");
    const [alttext, setAlttext] = useState("");
    const [uploading, setUploading] = useState(false);

    const handlePictureChange = (event) => setPictureFile(event.target.files[0]);
    const handleTitleChange = (event) => setTitle(event.target.value);
    const handleAlttextChange = (event) => setAlttext(event.target.value);

    const handleSubmit = async (event) => {
    event.preventDefault();

    if (!pictureFile) {
        alert("No image selected!");
        return;
    }

    setUploading(true);

    try {
        const imgURL = await uploadToImgBB(pictureFile);

        const payload = {
            url : imgURL,
            title: title,
            alttext : alttext
            };
    
        await createPicture(payload);

        setPictureFile(null); // clears message field upon submit
        setTitle(""); // clears message field upon submit
        setAlttext(""); // clears message field upon submit
    } catch (error) {
        console.error("Failed to upload image: ", error);
        alert("Failed to upload!");
    } finally {
        setUploading(false);
    }};



    return (
    <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Upload Picture</Form.Label>
        <Form.Control
        onChange={handlePictureChange}
        accept="image/*"
        type="file"
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

    <Button value="Submit" variant="primary" type="submit" disabled={uploading}>
        {uploading ? "Uploading..." : "Submit"}
    </Button>

    </Form>
    );
};

export default ExternalPostPicture;
