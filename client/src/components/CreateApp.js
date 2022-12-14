import "../stylesheets/CreateApp.css";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import APICalls from "../services/APICalls";
import { useNavigate } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";
import { useAppContext } from "../Lib/AppContext";
import { Col, Row } from "react-bootstrap";

const CreateApp = () => {
  const [repos, setRepos] = useState([]);
  const [appName, setAppName] = useState("Application name");
  const [description, setDescription] = useState("");
  const [accessKey, setAccessKey] = useState("IAM Access Key");
  const [secretKey, setSecretKey] = useState("IAM Secret Key");
  const [repo, setRepo] = useState(undefined);
  const { authUser, userId } = useAppContext();

  const navigate = useNavigate();
  useEffect(() => {
    const getRepos = async () => {
      try {
        const data = await APICalls.getRepos(userId);
        setRepos(data);
      } catch (e) {
        console.log(e.message);
      }
    };

    getRepos();
  }, [userId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!repo) {
      alert("Please, select a repo from the provided list");
      return;
    }
    const app = {
      appName: appName.replace(" ", "-"),
      userLogin: authUser,
      userId: userId,
      description: description,
      repoName: repo,
      defaultIAMAccessKey: accessKey,
      defaultIAMSecretKey: secretKey,
    };
    try {
      const data = await APICalls.postApps(app);
      if (data.message) {
        alert(data.message);
        return;
      }
      navigate(`/Apps`);
    } catch (e) {
      console.log(e.message);
    }
  };

  const CONFIGURE = `https://github.com/apps/${process.env.REACT_APP_GitHubApp}/installations/new`;

  return (
    <div className="Login form-layout">
      <Container className="form-container">
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlid="formBasicName">
            <p className="text-start">Application Name:</p>
            <Form.Control
              type="string"
              placeholder="Application name"
              required
              onChange={(e) => setAppName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlid="formBasicDescription">
            <p className="text-start">Description:</p>
            <Form.Control
              type="string"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <p className="text-start">Repo:</p>
            <Form.Select
              aria-label="select repo"
              size="sm"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              required
            >
              <option>Click here to select a repo</option>
              {repos.map((repo, idx) => (
                <option key={idx}>{repo}</option>
              ))}
            </Form.Select>
            <p className="text-center  pb-0 text-light fw-light">
              <em>Don't see your repo? configure github</em>
            </p>

            <Nav.Link target="_" href={CONFIGURE}>
              <Row className="d-flex pt-1">
                <Col>
                  <Button className="d-flex settings-configure-git">
                    Configure Github
                  </Button>
                </Col>
              </Row>
            </Nav.Link>
          </Form.Group>
          <Form.Group className="mb-3" controlid="formBasicAccessKey">
            <p className="text-start pt-1">IAM Access Key:</p>
            <Form.Control
              type="password"
              placeholder="IAM Access Key"
              required
              onChange={(e) => setAccessKey(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlid="formBasicSecretKey">
            <p className="text-start">IAM Access Secret:</p>
            <Form.Control
              type="password"
              placeholder="IAM Secret Key"
              required
              onChange={(e) => setSecretKey(e.target.value)}
            />
          </Form.Group>
          <Row className="container">
            <Col>
              <Button size="md" type="submit" className="submit">
                Submit
              </Button>
            </Col>
            <Col className="text-center">
              <Button href="/apps" className="settings-btn-delete" size="md">
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default CreateApp;
