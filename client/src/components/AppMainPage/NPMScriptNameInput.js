import "../../App.css";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import { useAppContext } from "../../Lib/AppContext";
// import APICalls from "../../services/APICalls";

const NPMScriptNameInput = ({stage, stages, setStages}) => {
  const [npmScriptName, setNPMScriptName] = useState(stage.npmScriptName);
  const [isSubmissionSaved, setIsSubmissionSaved] = useState(true);

  const handleNPMScriptNameChangeSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmissionSaved(false);
      console.log(npmScriptName)
      setTimeout(() => setIsSubmissionSaved(true), 3000);
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <>
    <h3>Choose an optional NPM command to be executed before deployment:</h3>
    <Form onSubmit={handleNPMScriptNameChangeSubmit}>
    <Form.Label>e.g. enter 'test' for 'npm run test'</Form.Label>
    <Form.Control
      aria-label="npm script input"
      placeholder="npm command name"
      type="text"
      value={npmScriptName}
      onChange={(e) => setNPMScriptName(e.target.value)}
    >
    </Form.Control>
    <Button variant="primary" type="submit" disabled={!isSubmissionSaved}>
      Submit
    </Button>
  </Form>
  </>
  )
}

export default NPMScriptNameInput;