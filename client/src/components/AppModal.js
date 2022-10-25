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


  // const dropIt = () => {
  //   document.getElementById("myDropdown")
  // .classList.toggle("show");
  // }

  // window.onclick = function(event) {
  //   if (!event.target.matches('.dropbtn')) {
  //     var dropdowns = document.getElementsByClassName("dropdown-content");
  //     var i;
  //     for (i = 0; i < dropdowns.length; i++) {
  //       var openDropdown = dropdowns[i];
  //       if (openDropdown.classList.contains('show')) {
  //         openDropdown.classList.remove('show');
  //       }
  //     }
  //   }
  // }

  return (
    <div>
      <div class="container">
        <MiniNavBar></MiniNavBar>
        <Container>
          <Card className="card-top">
            <Row>
              <Col>
                <Card.Header>
                  <p class="text-white">Activity</p>
                </Card.Header>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card.Body className="card-body">
                  <Row>
                    <Col>
                      <Card.Title>View All</Card.Title>
                      <Card.Text>Auto-deploy</Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Container>
        <Container class="#">
          <Card className="card-top mt-3">
            <Row>
              <Col>
                <Card.Header>
                  <p class="text-white">Pipeline</p>
                </Card.Header>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card.Body className="card-body">
                  <p>DEVELOPMENT</p>
                  <Row>
                    {stages.map((stage) => (
                      <Col key={stage.stageId} className="stage-row">
                        <Card.Title class="text-black">
                          Stage Name: {stage.stageName}
                        </Card.Title>
                        <Card.Text>
                          Stage Branch:{" "}
                          {stage.stageBranch !== "undefined"
                            ? stage.stageBranch
                            : "no branch"}
                        </Card.Text>
                        <Button
                          variant="dark"
                          size="sm"
                          onClick={(e) => handleDeployClick(e, stage.stageName)}
                        >
                          Manually Deploy Stage
                        </Button>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Container>
        <div class="p-3 bg-light">
          <div class="d-flex p-2 bd-highlight bg-warning">
            testing flexbox container
          </div>
        </div>
      </div>

      <div class="container">
        <div class="card p-2 bg-light mt-3 mid-wide-card">
          <div class="container">
            <div class="row">
              <div class="row d-flex">
                <div
                  class="col col-auto 
                pipeline-title"
                >
                  Pipeline
                  <a class="ps-2 small-font" href="/apps">
                    edit
                  </a>
                </div>
                {/* <div class="col-auto d-flex
                justify-content-start
                align-items-end
                 small-font flex-grow-1">Edit</div> */}
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
              <div class="col p-2 bg-white">
                <div class="row">
                  <div class="col SectionHeader">Development</div>
                  <div class="col">
                    {/* <div class="dropdown">
                      <button class="dropbtn">
                        v
                      </button>
                      <div id="myDropdown" class="dropdown-content">
                        <a href="#home">deploy</a>
                        <a href="#about">Promote To Prod</a>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div class="card mini-card">
                  <row class="stage-title"></row>
                </div>
              </div>

              <div class="col p-2 bg-white">
                <div class="row">
                  <div class="col-auto SectionHeader">Production</div>
                  <div class="col-1">
                    {/* <button class="dropbtn" size="sm">
                      v
                    </button> */}
                  </div>
                </div>
                <div class="card mini-card">
                  <row class="stage-title">
                    <div class="PipelineTableStageStatusCell mini">
                      <a href="/marcodes/Dobby-Notes/activity/stages/prod/builds/1">
                        <i aria-hidden="true" class="fa  fa-check-circle "></i>
                      </a>
                      <div>
                        <p class="line-1">
                          <a
                            class="id"
                            href="/marcodes/Dobby-Notes/activity/stages/prod/builds/1"
                          >
                            v1
                          </a>
                          <span class="date">Oct 17, 2:00 PM</span>
                        </p>
                        <p class="line-2">
                          <a
                            target="_blank"
                            class="branch"
                            rel="noopener noreferrer"
                            href="https://github.com/Maru-ko/notes-one1/tree/main"
                          >
                            <i aria-hidden="true" class="fa  fa-code-fork "></i>
                            main
                          </a>
                          <a
                            target="_blank"
                            class="commit"
                            rel="noopener noreferrer"
                            href="https://github.com/Maru-ko/notes-one1/commit/abd29d1df4dcb5cd3b8a0a141b9276c0ba6b7029"
                          >
                            abd29d1
                          </a>
                        </p>
                      </div>
                    </div>
                  </row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="Apps">
          <div class="cols">
            <div class="col-1">
              <div class="cell stages">
                <div class="MiniPipelineTable count-2">
                  <h4>
                    <span>
                      Pipeline
                      <a href="/marcodes/Dobby-Notes/pipeline/edit">Edit</a>
                    </span>
                    <a href="/marcodes/Dobby-Notes/pipeline">
                      View Full Pipeline &nbsp;
                      <i aria-hidden="true" class="fa  fa-angle-right "></i>
                    </a>
                  </h4>
                  <div class="list">
                    <div class="part">
                      <div class="title">
                        <h5 class="SectionHeader ">Development</h5>
                        <span class="glyphicon glyphicon-arrow-right"></span>
                      </div>
                      <div class="body">
                        <div class="MiniPipelineStageCell idle  ">
                          <div class="title">
                            <a
                              class="name"
                              title="dev"
                              href="/marcodes/Dobby-Notes/activity/stages/dev"
                            >
                              dev
                            </a>
                            <div class="PipelineDropdownButton ">
                              <div class="dropdown btn-group">
                                <button
                                  id="build-dropdown-dev"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                  type="button"
                                  class="dropdown-toggle btn btn-default"
                                >
                                  <i
                                    aria-hidden="true"
                                    class="fa  fa-chevron-down "
                                  ></i>
                                </button>
                                <ul
                                  role="menu"
                                  class="dropdown-menu dropdown-menu-right"
                                  aria-labelledby="build-dropdown-dev"
                                >
                                  <li role="presentation" class="">
                                    <a role="menuitem" tabindex="-1" href="/">
                                      Deploy
                                    </a>
                                  </li>
                                  <li role="presentation" class="#">
                                    <a role="menuitem" tabindex="-1" href="/">
                                      Promote to prod!!!
                                    </a>
                                  </li>
                                  <li role="separator" class="divider"></li>
                                  <li role="presentation" class="">
                                    <a
                                      href="/marcodes/Dobby-Notes/stages/dev"
                                      role="menuitem"
                                      tabindex="-1"
                                    >
                                      View Resources &nbsp;
                                      <i
                                        aria-hidden="true"
                                        class="fa  fa-angle-right "
                                      ></i>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div class="PipelineTableStageStatusCell mini">
                            <p class="empty">—</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="part">
                      <div class="title">
                        <h5 class="SectionHeader ">Production</h5>
                      </div>
                      <div class="body">
                        <div class="MiniPipelineStageCell idle prod ">
                          <div class="title">
                            <a
                              class="name"
                              title="prod"
                              href="/marcodes/Dobby-Notes/activity/stages/prod"
                            >
                              prod
                            </a>
                            <div class="PipelineDropdownButton ">
                              <div class="dropdown btn-group">
                                <button
                                  id="build-dropdown-prod"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                  type="button"
                                  class="dropdown-toggle btn btn-default"
                                >
                                  <i
                                    aria-hidden="true"
                                    class="fa  fa-chevron-down "
                                  ></i>
                                </button>
                                <ul
                                  role="menu"
                                  class="dropdown-menu dropdown-menu-right"
                                  aria-labelledby="build-dropdown-prod"
                                >
                                  <li role="presentation" class="">
                                    <a tabindex="-1" href="/">
                                      Deploy
                                    </a>
                                  </li>
                                  <li role="separator" class="divider"></li>
                                  <li role="presentation" class="">
                                    <a
                                      href="/marcodes/Dobby-Notes/stages/prod"
                                      role="menuitem"
                                      tabindex="-1"
                                    >
                                      View Resources &nbsp;
                                      <i
                                        aria-hidden="true"
                                        class="fa  fa-angle-right "
                                      ></i>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div class="PipelineTableStageStatusCell mini">
                            <a href="/marcodes/Dobby-Notes/activity/stages/prod/builds/1">
                              <i
                                aria-hidden="true"
                                class="fa  fa-check-circle "
                              ></i>
                            </a>
                            <div>
                              <p class="line-1">
                                <a
                                  class="id"
                                  href="/marcodes/Dobby-Notes/activity/stages/prod/builds/1"
                                >
                                  v1
                                </a>
                                <span class="date">Oct 17, 2:00 PM</span>
                              </p>
                              <p class="line-2">
                                <a
                                  target="_blank"
                                  class="branch"
                                  rel="noopener noreferrer"
                                  href="https://github.com/Maru-ko/notes-one1/tree/main"
                                >
                                  <i
                                    aria-hidden="true"
                                    class="fa  fa-code-fork "
                                  ></i>
                                  main
                                </a>
                                <a
                                  target="_blank"
                                  class="commit"
                                  rel="noopener noreferrer"
                                  href="https://github.com/Maru-ko/notes-one1/commit/abd29d1df4dcb5cd3b8a0a141b9276c0ba6b7029"
                                >
                                  abd29d1
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-2">
                <div class="col-4">
                  <div class="cell activity">
                    <div class="MiniActivityList">
                      <h4>
                        <span>Activity</span>
                        <a href="/marcodes/Dobby-Notes/activity">
                          View All &nbsp;
                          <i aria-hidden="true" class="fa  fa-angle-right "></i>
                        </a>
                      </h4>
                      <div class="list">
                        <div class="MiniActivityItem completed">
                          <div class="actor">
                            <div
                              title="Marcos"
                              class="UserImage src size-xsmall active"
                            >
                              <img
                                alt=""
                                src="https://avatars.githubusercontent.com/u/53981643?v=4"
                              />
                            </div>
                          </div>
                          <p class="body">
                            <span>
                              Auto-deploy{" "}
                              <a
                                target="_blank"
                                class="commit"
                                href="https://github.com/Maru-ko/notes-one1/commit/abd29d1df4dcb5cd3b8a0a141b9276c0ba6b7029"
                                rel="noopener noreferrer"
                              >
                                abd29d1
                              </a>{" "}
                              to <b>prod</b>
                            </span>
                            <a
                              class="build"
                              title="Completed"
                              href="/marcodes/Dobby-Notes/activity/stages/prod/builds/1"
                            >
                              <i aria-hidden="true" class="fa  fa-check "></i>
                            </a>
                          </p>
                          <div class="status">
                            <a href="/marcodes/Dobby-Notes/activity/stages/prod/builds/1">
                              <span>Oct 17, 2:00 PM</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppModal;
