import "../../App.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import APICalls from "../../services/APICalls";

const NPMScriptNameInput = ({stage, stages, setStages}) => {
  const [npmScriptName, setNPMScriptName] = useState(stage.npmScriptName);
  const [isSubmissionInProgress, setIsSubmissionInProgress] = useState(false);

  const handleNPMScriptNameChangeSubmit = async (e) => {
    e.preventDefault();
    setIsSubmissionInProgress(true);
    try {
      const response = await APICalls.setStageNPMCommand({stageId: stage.stageId, npmScriptName});
      if (response.status === 200) {
        const responseData = JSON.parse(response.data);
        const updatedStages = stages.map((s) =>
        s.stageId === stage.stageId
          ? { ...s, ...responseData }
          : s
        );
        setStages(updatedStages)
      }
    } catch (e) {
      console.log(e.message)
    }
    setIsSubmissionInProgress(false);
  }

  const generateSubmitButtonText = () => {
    if (isSubmissionInProgress) return "Saving...";
    if (npmScriptName === stage.npmScriptName) return "Saved";
    return "Submit";
  }
  
  return (
    <>
    <h4>Choose an optional NPM command to be executed before deployment:</h4>
    <Form onSubmit={handleNPMScriptNameChangeSubmit}>
    <p className="text-start">e.g. enter 'test' for 'npm run test'</p>
    <Form.Control
      aria-label="npm script input"
      placeholder="npm command name"
      type="text"
      value={npmScriptName}
      onChange={(e) => setNPMScriptName(e.target.value)}
    >
    </Form.Control>
    <Button variant="primary" type="submit" disabled={isSubmissionInProgress || npmScriptName === stage.npmScriptName}>
      {generateSubmitButtonText()}
    </Button>
  </Form>
  </>
  )
}

export default NPMScriptNameInput;