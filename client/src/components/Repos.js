import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import APICalls from "../services/APICalls";

const Repos = ({ authUser }) => {
  const [repos, setRepos] = useState([]);
  const [repo, setRepo] = useState("select repo");

  const handleGetReposClick = async (e) => {
    try {
      const data = await APICalls.getRepos(authUser);
      setRepos(data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleBuildRepoClick = async (e) => {
    try {
      await APICalls.buildRepo(authUser, repo);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <>
      {repos.length === 0 ? (
        <>
          <h2>Github authenticated you!!!</h2>
          <Button onClick={handleGetReposClick}>Get Repos</Button>
        </>
      ) : (
        <>
          <h2>Select a Repo from the list to build</h2>
          <Form>
            <Form.Select
              aria-label="select repo"
              size="lg"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
            >
              <option>Select a repo</option>
              {repos.map((repo, idx) => (
                <option key={idx}>{repo}</option>
              ))}
            </Form.Select>
            <Button onClick={handleBuildRepoClick}>Build Repo</Button>
          </Form>
        </>
      )}
    </>
  );
};

export default Repos;
