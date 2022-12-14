import "../../App.css";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NPMScriptNameInput from "./NPMScriptNameInput";
import ToggleIsUnitTestRequired from "./ToggleIsUnitTestRequired";
import { useAppContext } from "../../Lib/AppContext";
import APICalls from "../../services/APICalls";
import { Row } from "react-bootstrap";
import DeleteStage from "./DeleteStage";

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
  const [teardownVisible, setTeardownVisible] = useState(false);

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
    if (stage.stageState === "deployed") {
      setTeardownVisible(true);
    }
  }, [appName, userId, appId, stage.stageState]);

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

  const handleTeardownClick = async (e) => {
    try {
      const response = await APICalls.teardown({
        stageId: stage.stageId,
        userId,
        appId,
        commitId: stage.lastCommitId,
      });

      if (response.status === 200) {
        setTeardownVisible(false);
        console.log("data: ", response.data);
        const responseData = JSON.parse(response.data);
        const updatedStages = stages.map((s) =>
          s.stageId === stage.stageId ? { ...s, ...responseData } : s
        );
        setStages(updatedStages);
      }
    } catch (e) {
      console.log(
        `error requesting teardown of stage ${stage.stageName}: ${e.message}`
      );
    }
  };

  return (
    <>
      <div className="screen" onClick={handleScreenClick}></div>
      <div className="modal holder main-modal p-3 m-3">
        {stage.stageName === "prod" || stage.stageName === "staging" || stage.stageName === "dev" ? null : (
          <DeleteStage stage={stage} setStages={setStages} />
        )}
        {
          stage.stageName !== "prod" && stage.stageName !== "staging" ?

          repoBranches.length === 0 ? (
            <p>Loading branches</p>
          ) : (
            <>
              <h4>Change git branch for stage {stage.stageName}:</h4>
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
                <Button variant="primary mt-2" type="submit">
                  Submit
                </Button>
                <hr></hr>
              </Form>
            </>
          ) :
          null
        }
        <h4>Set per-stage IAM credentials</h4>
        <Form onSubmit={handleIAMCredentialsSubmit}>
          <Form.Group className="mb-3" controlid="formBasicAccessKey">
            <p className="text-start">IAM Access Key:</p>
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
          <h4>Set stage environment variables as a JSON string </h4>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://jsonformatter.curiousconcept.com/"
          >
            online formatter
          </a>
          <Form.Control
            type="textarea"
            className="mt-1"
            placeholder="JSON-formatted ENV variables"
            required
            onChange={(e) => setEnvVariablesString(e.target.value)}
          />
          <Button variant="primary" type="submit" className="mt-2">
            Submit
          </Button>
        </Form>
        {teardownVisible ? (
          <Row className="text-center">
            {" "}
            <hr></hr>
            <div className="mt-3">
              <h4>{`Would you like to teardown stage ${stage.stageName}?`}</h4>
              <Button onClick={handleTeardownClick} type="submit">
                Teardown
              </Button>
            </div>
          </Row>
        ) : null}
        <hr></hr>
        <NPMScriptNameInput
          stage={stage}
          stages={stages}
          setStages={setStages}
        ></NPMScriptNameInput>
        <hr></hr>
        <ToggleIsUnitTestRequired
          stage={stage}
          stages={stages}
          setStages={setStages}
        ></ToggleIsUnitTestRequired>
      </div>
    </>
  );
};

export default BranchSettings;
