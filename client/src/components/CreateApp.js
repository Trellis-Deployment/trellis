import { Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import APICalls from "../services/APICalls";
import "../stylesheets/CreateApp.css";
import { useNavigate } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";

const CreateApp = ({ authUser, userId }) => {
  const [repos, setRepos] = useState([]);
  const [appName, setAppName] = useState("Application name");
  const [description, setDescription] = useState("Description");
  const [accessKey, setAccessKey] = useState("IAM Access Key");
  const [secretKey, setSecretKey] = useState("IAM Secret Key");
  const [repo, setRepo] = useState(undefined);

  const navigate = useNavigate();
  useEffect(() => {
    const getRepos = async () => {
      try {
        console.log({userId});
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
    const app = {
      appName: appName.replace(" ", "-"),
      userLogin: authUser,
      userId: userId,
      description,
      repoName: repo,
      defaultIAMAccessKey: accessKey,
      defaultIAMSecretKey: secretKey,
    };
    try {
      const data = await APICalls.postApps(app);
      console.log(data);
      navigate(`/application/${appName}`);
    } catch (e) {
      console.log(e.message);
    }
  };

  const CONFIGURE = `https://github.com/apps/${process.env.REACT_APP_GitHubApp}/installations/new`;

  return (
    <div className="Login">
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
              {repos.map((repo, idx) => (
                <option key={idx}>{repo}</option>
              ))}
            </Form.Select>
            <p className="text-center  pb-0 text-light fw-light">
              <em>Don't see your repo? configure github</em>
            </p>
            <Nav.Link href={CONFIGURE}>
              <Button variant="success" size="sm">
                Configure Github
              </Button>
            </Nav.Link>
          </Form.Group>
          <Form.Group className="mb-3" controlid="formBasicAccessKey">
            <p className="text-start pt-3">IAM Access Key:</p>
            <Form.Control
              type="string"
              placeholder="IAM Access Key"
              required
              onChange={(e) => setAccessKey(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlid="formBasicSecretKey">
            <p className="text-start">IAM Access Secret:</p>
            <Form.Control
              type="string"
              placeholder="IAM Secret Key"
              required
              onChange={(e) => setSecretKey(e.target.value)}
            />
          </Form.Group>
          {/* <div className="bg-transparent p-3 m-2"> */}
          <div className="container">
            <Button
              variant="outline-light"
              size="md"
              type="submit"
              className="submit"
            >
              Submit
            </Button>
            <Button href="/apps" variant="outline-danger" size="md">
              Cancel
            </Button>
          </div>
          {/* </div> */}
        </Form>
      </Container>
    </div>
  );
};

export default CreateApp;
