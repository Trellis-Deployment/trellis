import Button from "react-bootstrap/Button";
import { useAppContext } from "../../Lib/AppContext";
import APICalls from "../../services/APICalls";
import { Row } from "react-bootstrap";
import "../../App.css";

const TeardownModal = ({ stage, setTeardownVisible, stages, setStages }) => {
  const { appName, userId } = useAppContext();

  const handleScreenClick = (e) => {
    if (e.target.classList.contains("screen")) {
      setTeardownVisible(false);
    }
  };

  const handleTeardownClick = async (e) => {
    try {
      const response = await APICalls.teardown({
        stageId: stage.stageId,
        userId,
        appName,
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
    <Row>
      {/* <div className="screen" onClick={handleScreenClick}>
    </div> */}
      <div className="#">
        <p>{`Are you sure you want to teardown stage ${stage.stageName}?`}</p> :
        <Button onClick={handleTeardownClick} variant="primary" type="submit">
          Yes, Tear It Down
        </Button>
        <Button
          onClick={() => setTeardownVisible(false)}
          variant="secondary"
          type="cancel"
        >
          Cancel
        </Button>
      </div>
    </Row>
  );
};

export default TeardownModal;
