import "../../App.css";
import "../../stylesheets/AppStage.css";
import { Col, Row } from "react-bootstrap";

import {
  CloudCheck,
  Code,
  ExclamationCircle,
  Gear
} from "react-bootstrap-icons";

const StageData = ({ stage }) => {

  if (stage.stageBranch === 'main') {
    return (
      <div className="stage-info">
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
                className="commit ps-1 stage-info"
                rel="noopener noreferrer"
                href={stage.stageId}
              >
                Last Deployed: {String(new Date(stage.lastDeploymentTime))}
              </a>
              App ID: {stage.appId.split('-')[0]}
            </Row>
          </div>
        </Row>
        {stage.stageStage ==='created' && <Col className="text-center"><CloudCheck color="yellow" size={28}/></Col>}
        {stage.stageState === 'deployed' && <Col className="text-center"> <CloudCheck color="green" size={28}/></Col>}
        {stage.stageState === 'deploying' &&  <Col><Gear className="text-center text-light spinner-border"color="dark" size={29} /></Col>}
        {stage.stageState === 'error' && <Col className="text-center"> <ExclamationCircle color="red" size={28} /></Col>}
      </div>
    ) 
  } else {
    return (
      <div>
        <Col>
          <Code color="grey" size={28} />
        </Col>
      </div>
    )

  }
}

export default StageData;




