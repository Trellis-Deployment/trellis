import "../../App.css";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import APICalls from "../../services/APICalls";

const ToggleIsUnitTestRequired = ({ stage, stages, setStages }) => {
  const [isUnitTestRequired, setIsUnitTestRequired] = useState(
    stage.isUnitTestRequired || false
  );
  const [isSubmissionInProgress, setIsSubmissionInProgress] = useState(false);

  const handleUnitTestToggle = async (e) => {
    setIsUnitTestRequired(!isUnitTestRequired);
    setIsSubmissionInProgress(true);
    try {
      const response = await APICalls.toggleIsUnitTestRequired({
        stageId: stage.stageId,
        isUnitTestRequired: !isUnitTestRequired,
      });
      if (response.status === 200) {
        const responseData = JSON.parse(response.data);
        const updatedStages = stages.map((s) =>
          s.stageId === stage.stageId ? { ...s, ...responseData } : s
        );
        setStages(updatedStages);
      }
    } catch (e) {
      console.log(e.message);
    }
    setIsSubmissionInProgress(false);
  };

  return (
    <Form>
      <Form.Check
        checked={isUnitTestRequired}
        disabled={isSubmissionInProgress}
        type="switch"
        id="unitTestSwitch"
        label="Run Unit Tests Before Deployment?"
        onChange={handleUnitTestToggle}
      />
    </Form>
  );
};

export default ToggleIsUnitTestRequired;
