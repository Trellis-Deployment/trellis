import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useAppContext } from "../../../Lib/AppContext";
import APICalls from "../../../services/APICalls";

const StagesForm = ({ toggleShowForm, stages, app, setStages }) => {
  const { userId, appId, appName } = useAppContext();
  const [branches, setBranches] = useState([]);
  const [ branch, setBranch ] = useState("");
  const [ stageName, setStageName] = useState("");
  const [ envVariablesString, setEnvVariablesString ] = useState("");
  const [ npmScriptName, setNpmScriptName ] = useState("");
  useEffect(() => {
    const loadBranches = async () => {
      try {
        const branches = await APICalls.getRepoBranches({ userId, appId });
        const filteredBranches = branches.filter(branch => {
          return !stages.some(stage => stage.stageBranch === branch.name);
        });
        setBranches(filteredBranches);
      } catch (e) {
        console.log(`error fetching repo branches for app ${appName}`, e);
        alert(e.message);
      }
    };
    loadBranches();

  }, [userId, appId, appName, stages]);

  const handleCancelClick = (e) => {
    e.preventDefault();
    toggleShowForm(false);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (stages.some(stage => stage.stageName === stageName)) {
      alert(`You can't use the same stage name of an existing stage name ${stageName}`);
      return;
    }
    if (!branch || branch === 'Click here to select a branch that is not tied to another stage') {
      alert("Please select a branch");
      return;
    }
    const newStage = {
      appId,
      stageName,
      IAMCredentialsLocation: app.defaultIAMCredentialsLocation,
      stageBranch: branch,
      stageState: "created",
      envVariablesString,
      npmScriptName,
    }

    try {
      const data = await APICalls.createStage(newStage);
      if (data.error) {
        alert(data.error);
      }
      const stages = await APICalls.getStages(app.appId);
      setStages(stages);
      toggleShowForm(false);
    } catch(e) {
      alert(e.message);
    }
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      <p className="text-start">New stage: (This stage will use the default APP AWS credentials. If you would like to change it, please do so on the stage settings after it's created.) </p>

      <Form.Group>
        <p>stage Name*</p>
        <Form.Control
          type="string"
          value={stageName}
          placeholder='stage name'
          onChange={(e) => setStageName(e.target.value)}
          required
        />
        <br/>
        <p>Environment variables(JSON string)</p>
        <a target="_blank" rel="noreferrer" href="https://jsonformatter.curiousconcept.com/">
              online formatter
        </a>
        <Form.Control
            type="textarea"
            className="mt-1"
            placeholder="JSON-formatted ENV variables"
            value={envVariablesString}
            onChange={(e) => setEnvVariablesString(e.target.value)}
        />
        <br/>
        <p>Choose an optional NPM command to be executed beforer deployment:(e.g. enter 'test' for 'npm run test')</p>
        <Form.Control
          placeholder="npm command name"
          type="text"
          value={npmScriptName}
          onChange={(e) => setNpmScriptName(e.target.value)}
        />
        <br/>
        <p>Stage Branch*</p>
        <Form.Select
          aria-label="select branch"
          size="sm"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          required
        >
          <option>Click here to select a branch that is not tied to another stage</option>
          {branches.map((branch, idx) => (
            <option key={idx}>{branch.name}</option>
          ))}
        </Form.Select>
        
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

export default StagesForm;