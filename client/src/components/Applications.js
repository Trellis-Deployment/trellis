import "../stylesheets/AppModal.css";
import Button from "react-bootstrap/Button";
import MiniNavBar from "./Header/MiniNavBar";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import APICalls from "../services/APICalls";
import { CloudCheck, Check2Circle, Code } from "react-bootstrap-icons";

const AppModal = ({ authUser }) => {
  const [stages, setStages] = useState([]);
  const appName = useParams().appName;
  console.log(useParams());

  useEffect(() => {
    const getStages = async () => {
      const data = await APICalls.getStages(authUser, appName);
      setStages(data);
    };
    getStages();
  }, [authUser, appName]);

  const handleDeployClick = async (e, stageName) => {
    e.preventDefault();
    const data = await APICalls.buildStage({ authUser, appName, stageName });
    console.log(data);
  };


  return (
    <div>
      <div class="px-3">
        <MiniNavBar></MiniNavBar>
      </div>

      <div class="container">
        <div class="card p-2 pipes mt-3 mid-wide-card">
          <div class="container">
            <div class="row">
              <div class="row">
                <div
                  class="col 
                pipeline-title"
                >
                  Pipeline
                  <a class="ps-2 small-font" href="/apps">
                    edit
                  </a>
                </div>
                <div
                  class="d-flex col pe-0
                justify-content-end 
                align-items-end
               small-font"
                >
                  <a href="/apps">View Full Pipeline</a>
                </div>
              </div>
            </div>

            <div class="row border">
              <div class="col  bg-white">
                <div class="row ">
                  {stages.map((stage) => (
                    <Col key={stage.stageId} className="stage-row" class="#">
                      <Card.Title class="SectionHeader">
                        Stage Name: {stage.stageName}
                      </Card.Title>
                      <Card.Text class="stage-branch">
                        <Row>
                          Stage Branch:{" "}
                          {stage.stageBranch !== "undefined"
                            ? stage.stageBranch
                            : "no branch"}{" "}
                          <Col class="lh-0">
                            {stage.stageBranch === "main" ? (
                              <div>
                                <p class="line-2">
                                  <a
                                    target="_blank"
                                    class="branch px-1"
                                    rel="noopener noreferrer"
                                    href="/"
                                  >
                                    <i
                                      aria-hidden="true"
                                      class="fa  fa-code-fork "
                                    ></i>
                                    main
                                  </a>
                                  <a
                                    target="_blank"
                                    class="commit ps-1"
                                    rel="noopener noreferrer"
                                    href="https://github.com/Maru-ko/notes-one1/commit/abd29d1df4dcb5cd3b8a0a141b9276c0ba6b7029"
                                  >
                                    abd29d1
                                  </a>
                                </p>
                                <Col>
                                  <CloudCheck color="green" size={28} />
                                </Col>
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
                          class="btn btn-sm px-1"
                          type="button"
                          onClick={(e) => handleDeployClick(e, stage.stageName)}
                        >
                          <text>Manually Deploy Stage</text>
                        </button>
                      </Row>
                    </Col>
                  ))}
                </div>
                <div class="card mini-card">
                  <row class="stage-title"></row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container py-3">
      </div>

 
    </div>
  );
};

export default AppModal;
