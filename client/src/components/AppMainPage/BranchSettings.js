import "../../App.css";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAppContext } from "../../Lib/AppContext";
import APICalls from "../../services/APICalls";

const BranchSettings = ({
  stage,
  setBranchSettingsVisible,
  stages,
  setStages,
}) => {
  const { appName, userId, appId } = useAppContext();
  const [repoBranches, setRepoBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(stage.stageBranch);
  const [iamAccessKeyId, setIamAccessKeyId] = useState("");
  const [iamSecretAccessKey, setIamSecretAccessKey] = useState("");
  const [envVariablesString, setEnvVariablesString] = useState("");

  useEffect(() => {
    const loadBranches = async () => {
      try {
        const branches = await APICalls.getRepoBranches({ userId, appId });
        setRepoBranches(branches);
      } catch (e) {
        console.log(`error fetching repo branches for app ${appName}`, e);
      }
    };
    loadBranches();
  }, [appName, userId, appId]);

  const handleScreenClick = (e) => {
    if (e.target.classList.contains("screen")) {
      setBranchSettingsVisible(false);
    }
  };

  const handleBranchChangeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await APICalls.setStageBranch({
        stageId: stage.stageId,
        branch: selectedBranch,
      });
      console.log(typeof setStages);
      if (response.status === 200) {
        const updatedStages = stages.map((s) =>
          s.stageId === stage.stageId
            ? { ...s, stageBranch: selectedBranch }
            : s
        );
        console.log({ updatedStages });
        setStages(updatedStages);
      }
    } catch (e) {
      console.log(``);
    }
  };

  const handleIAMCredentialsSubmit = async (e) => {
    e.preventDefault();
    try {
      await APICalls.setStageIamCredentials({
        stageId: stage.stageId,
        accessKeyId: iamAccessKeyId,
        secretAccessKey: iamSecretAccessKey,
      });
    } catch (e) {
      console.log(``);
    }
  };

  const handleEnvVariableSubmit = async (e) => {
    e.preventDefault();
    try {
      await APICalls.setStageEnvVariables({
        stageId: stage.stageId,
        envJSONString: envVariablesString,
      });
    } catch (e) {
      console.log(``);
    }
  };
  return (
    <>
      <div className="screen" onClick={handleScreenClick}></div>
      <div className="modal">
        {repoBranches.length === 0 ? (
          <p>Loading branches</p>
        ) : (
          <>
            <p>Change git branch for stage {stage.stageName}:</p>
            <Form onSubmit={handleBranchChangeSubmit}>
              <Form.Select
                aria-label="branch select"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              >
                {repoBranches.map((branch) => (
                  <option key={branch.name} value={branch.name}>
                    {branch.name}
                  </option>
                ))}
              </Form.Select>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </>
        )}
        <hr></hr>
        <Form onSubmit={handleIAMCredentialsSubmit}>
          <h3>Set per-stage IAM credentials</h3>
          <p className="text-start">IAM Access Key ID:</p>
          <Form.Group className="mb-3" controlid="formBasicAccessKey">
            <p className="text-start pt-1">IAM Access Key:</p>
            <Form.Control
              type="password"
              placeholder="IAM Access Key"
              required
              onChange={(e) => setIamAccessKeyId(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlid="formBasicSecretKey">
            <p className="text-start">IAM Access Secret:</p>
            <Form.Control
              type="password"
              placeholder="IAM Secret Key"
              required
              onChange={(e) => setIamSecretAccessKey(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <hr></hr>
        <Form onSubmit={handleEnvVariableSubmit}>
          <h3>
            Set stage environment variables as a JSON string -{" "}
            <a target="_blank" href="https://jsonformatter.curiousconcept.com/">
              online formatter
            </a>
          </h3>
          <Form.Control
            type="textarea"
            placeholder="JSON-formatted ENV variables"
            required
            onChange={(e) => setEnvVariablesString(e.target.value)}
          />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default BranchSettings;
