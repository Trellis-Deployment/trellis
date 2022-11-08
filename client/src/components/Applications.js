import "../stylesheets/Applications.css";
import { useState, useEffect } from "react";
import APICalls from "../services/APICalls";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "react-bootstrap-icons";
import { useAppContext } from "../Lib/AppContext";
import Shapes from './Development/Shapes';
import {  Button, Card, Col, Row } from "react-bootstrap";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const { authUser, userId, setAppName, setAppId } = useAppContext();

  useEffect(() => {
    const getApps = async () => {
      try {
        const data = await APICalls.getApps(userId);
        setApplications(data);
      } catch (e) {
        console.log(e.message);
      }
    };

    getApps();
  }, [userId]);

  const handleNewAppClick = (e) => {
    e.preventDefault();
    navigate("/create-app");
  };

  const handleAppClick = (e, application) => {
    e.preventDefault();
    setAppName(application.appName);
    setAppId(application.appId);
    window.sessionStorage.setItem("trellisAppName", application.appName);
    window.sessionStorage.setItem("trellisAppId", application.appId);
    navigate(`/application/${application.appName}`);
  };

  return (
    <div className="app-list-home container pt-2">
      <Shapes></Shapes>
      <div className="row pb-2">
        <Col>
          <Button onClick={handleNewAppClick} size="sm" variant="primary" className="settings-configure-git">
            <PlusCircle size={25} className="pe-1"/> New App
          </Button>
        </Col>
        <Col className="col-auto">
          <h3 className="text-start welcome">Welcome {authUser}</h3>
        </Col>
        <div></div>
      </div>
      
      <Row className="mt-3">
        <ul className="container p-0">
          {applications.map((application) => (
            <div key={application.appId} className="row">
              <li className="my-1">
                <div className="oam">
                  <div className="button"
                    key={application.appId}
                    onClick={(e) => handleAppClick(e, application)}
                  >
                    <Row className="mx-2 ps-2">
                      <Col
                        className="col-auto
                      align-self-center"
                      >
                        {
                          <span className="badge badge-text">
                            {application.appName[0].toUpperCase()}
                          </span>
                        }
                      </Col>
                      <Col>
                        <Card.Body className="py-2">
                          <Card.Subtitle className="text-start card-text">
                            App: {application.appName}
                          </Card.Subtitle>
                          <Card.Title className="text-start card-text b">
                            Repo: {application.repoName}
                          </Card.Title>
                        </Card.Body>
                      </Col>
                      <Col
                        className="col-auto 
                      align-self-center 
                      
                      pe-4"
                      >
                        <div className="row dep d-flex justify-content-end">
                          Last Deployed
                        </div>
                        <div className="row date">-</div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </Row>
    </div>
  );
};

export default Applications;
