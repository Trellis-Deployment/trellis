import "../../stylesheets/AppModal.css";
import { Col, Card, Row} from "react-bootstrap"
import { useEffect } from "react";
import APICalls from "../../services/APICalls";
import { CloudCheck, Code, ExclamationCircle, GearWideConnected } from "react-bootstrap-icons";


const Stage = ({ stage, authUser, appName, setStages, stages }) => {

  const handleDeployClick = async (e, stageName) => {
    e.preventDefault();
    await APICalls.buildStage({ authUser, appName, stageName });
    const data = await APICalls.getStages(authUser, appName);
    setStages(data);
  };
  
  useEffect(() => {
    const intervalDuration = stage.state === 'deployed' ? 60000 : 30000;

    const intervalId = setInterval(async () => {
      const data = await APICalls.getStageStatus(stage);
      if (data.state === stage.stageState) {
        return;
      }

      setStages(stages.map((s) => s.stageId === stage.stageId ? ({...s, stageState: data.state}) : s));
      console.log('poll');
    }, intervalDuration);

    return (() => {
      clearInterval(intervalId);
    });
  }, []);

  return (
    <Col key={stage.stageId} className="stage-row">
      <Card.Title className="SectionHeader">
        Stage Name: {stage.stageName}
      </Card.Title>
      <Card.Text className="stage-branch">
        <Row>
          Stage Branch:{" "}
          {stage.stageBranch !== "undefined"
            ? stage.stageBranch
            : "no branch"}{" "}
          <Col className="lh-0">
            {stage.stageBranch === "main" ? (
              <div className="row">
                <Row>
                  {" "}
                  <div className="line-2">
                    <a
                      target="_blank"
                      className="branch px-1"
                      rel="noopener noreferrer"
                      href="/"
                    >
                      <i
                        aria-hidden="true"
                        className="fa  fa-code-fork "
                      ></i>
                      main
                    </a>
                    <Row>
                      <a
                        target="_blank"
                        className="commit ps-1"
                        rel="noopener noreferrer"
                        href={stage.Id}
                      >
                        Stage ID: {stage.stageId.split('-')[0]}
                      </a>
                      <p>App ID: {stage.appId.split('-')[0]}</p>
                    </Row>
                  </div>
                </Row>
                {stage.stageStage ==='created' && <Col className="text-center"> <CloudCheck color="yellow" size={28}/></Col>}
                {stage.stageState === 'deployed' && <Col className="text-center"> <CloudCheck color="green" size={28}/></Col>}
                {stage.stageState === 'deploying' && <div className="spinner-border gear text-center"><GearWideConnected color="grey" size={29} /></div>}
                {stage.stageState === 'error' && <Col className="text-center"> <ExclamationCircle color="red" size={28} /></Col>}
              </div>
            ) : (
              <div>
                <p>-</p>{" "}
                <Col>
                  {" "}
                  <Code color="grey" size={28} />
                </Col>
              </div>
            )}
          </Col>
        </Row>
      </Card.Text>

      <Row>
        <button
          className="btn btn-sm px-1" variant="success"
          type="button"
          onClick={(e) => handleDeployClick(e, stage.stageName)}
        >
          <text>Manually Deploy Stage</text>
        </button>
      </Row>
    </Col>
  );
};

export default Stage;