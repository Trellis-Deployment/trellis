import "../stylesheets/Applications.css";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import APICalls from "../services/APICalls";
import { useNavigate } from "react-router-dom";
// import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Applications = ({ authUser }) => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getApps = async () => {
      try {
        const data = await APICalls.getApps(authUser);
        setApplications(data);
      } catch (e) {
        console.log(e.message);
      }
    };

    getApps();
  }, [authUser]);

  const handleNewAppClick = (e) => {
    e.preventDefault();
    navigate("/create-app");
  };

  const handleAppClick = (e, appName) => {
    e.preventDefault();
    navigate(`/application/${appName}`);
  };

  return (
    <div className="app-list-home" class="container">
      <Container class="pt-1 px-1 pb-3">
        <Row>
          <Col class="start-0">
            <h3 class="text-start ps-3">Welcome {authUser}</h3>
          </Col>
          <Col class="#">
            <Button
              onClick={handleNewAppClick}
              variant="success"
              size="sm"
              class="#"
            >
              &#43; New App
            </Button>
          </Col>
        </Row>
      </Container>

      <ul class="container">
        {applications.map((application) => (
          <div class="row">
            <li className="m-1">
              <Container class="bg-dark">
                <Card
                  key={application.appId}
                  onClick={(e) => handleAppClick(e, application.appName)}
                  className="card-face w-auto"
                >
                  <Row>
                    <Col>
                      <Card.Body class="ps-3 py-2">
                        <Card.Title class="text-start c-title">
                          App: {application.appName}
                        </Card.Title>
                        <Card.Subtitle class="text-start c-subtitle">
                          Repo: {application.repo}
                        </Card.Subtitle>
                      </Card.Body>
                    </Col>
                    {/* <Col class="#">
              <span class="badge rounded-pill bg-danger">
                {application.appName[0].toUpperCase()}
              </span>
            </Col> */}
                    {/* <Col></Col> */}
                  </Row>
                </Card>
                {/* </Col> */}
                {/* </Row> */}
              </Container>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Applications;
