import "../../App.css";
// import "../../stylesheets/Stage.css"
import { Col, Row } from "react-bootstrap";

import {
  CloudCheck,
  Code,
  ExclamationCircle,
  GearWideConnected
} from "react-bootstrap-icons";

const stages = ({ stage }) => {

  if (stage.stageBranch === 'main') {
    return (
      <div>
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
                href={stage.stageId}
              >
                Last Deployed: {stage.lastDeploymentTime}
              </a>
              App ID: {stage.appId.split('-')[0]}
            </Row>
          </div>
        </Row>
        {stage.stageStage ==='created' && <Col className="text-center"><CloudCheck color="yellow" size={28}/></Col>}
        {stage.stageState === 'deployed' && <Col className="text-center"> <CloudCheck color="green" size={28}/></Col>}
        {stage.stageState === 'deploying' &&  <Col><GearWideConnected className="text-center text-light spinner-border"color="dark" size={29} /></Col>}
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

export default stages;




