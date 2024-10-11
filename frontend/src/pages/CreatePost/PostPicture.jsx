import { NavbarComponent } from "../../components/NavbarComponent";
import ExternalPostPicture from "../../components/ExternalPostPicture";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import AllPictures from "../../components/AllPictures";

export function PostPicture() {
    return(
        <>
        <NavbarComponent/>
        <Container className="vh-100 d-flex justify-content-center align-items-center">
        <Row className="w-100">
        <h2 className="fw-bold text-center mb-4">Post a picture</h2>
        <Col lg={6} md={8} className="mx-auto">
            <Row className="mb-4">
            <Col className="d-flex justify-content-center flex-column">
            <ExternalPostPicture/>
            </Col>
            </Row>
            </Col>
            </Row>
            </Container>
            <AllPictures/>
        </>
    )
}