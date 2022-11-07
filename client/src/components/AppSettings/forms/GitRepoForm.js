import { useState, useEffect } from "react";
import { Form, Button, Nav } from "react-bootstrap";
import { useAppContext } from "../../../Lib/AppContext";
import APICalls from "../../../services/APICalls";

const GitRepoForm = ({ onSubmit, toggleShowForm}) => {
  const [repo, setRepo] = useState("");
  const [repos, setRepos] = useState([]);
  const { userId } = useAppContext(); 
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if(!repo) {
      alert("Please, select a repo from the provided list");
      return;
    }
    await onSubmit(repo);
    toggleShowForm(false);
  }

  useEffect(() => {
    const getRepos = async () => {
      try {
        const data = await APICalls.getRepos(userId);
        setRepos(data);
      } catch(e) {
        console.log(e.message);
        alert(e.message);
      }
    }
    getRepos();
  }, [userId]);

  const handleCancelClick = (e) => {
    e.preventDefault();
    toggleShowForm(false);
  }

  const CONFIGURE = `https://github.com/apps/${process.env.REACT_APP_GitHubApp}/installations/new`;

  return (
    <Form onSubmit={handleFormSubmit}>
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
          <div className="row d-flex pt-1">
            <div className="col">
              <Button
                className="d-flex configure-git"
                variant="dark"
                size="dark"
              >
                Configure Github
              </Button>
            </div>
          </div>
        </Nav.Link>
      </Form.Group>
      <Button variant="primary" type="submit">
        Save
      </Button>
      <Button variant="secondary" onClick={handleCancelClick}>
        Cancel
      </Button>

    </Form>
  )
}

export default GitRepoForm;