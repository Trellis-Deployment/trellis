import "../stylesheets/Applications.css";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import APICalls from "../services/APICalls";
import { useNavigate } from "react-router-dom";
// import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Applications = ({ authUser }) => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getApps = async () => {
      try {
        const data = await APICalls.getApps(authUser);
        setApplications(data);
      } catch (e) {
        console.log(e.message);
      }
    };

    getApps();
  }, [authUser]);

  const handleNewAppClick = (e) => {
    e.preventDefault();
    navigate("/create-app");
  };

  const handleAppClick = (e, appName) => {
    e.preventDefault();
    navigate(`/application/${appName}`);
  };

  return (
    <div className="app-list-home" class="container">
      <div class="row pb-2">
        <div class="col col-auto">
          <h3 class="text-start">Welcome {authUser}</h3>
        </div>
        <div class="col d-flex justify-content-end">
          <Button
            onClick={handleNewAppClick}
            variant="light"
            size="sm"
            class="#"
          >
            &#43; New App
          </Button>
        </div>
      </div>
      <div class="row bg-black mt-3">
        <ul class="container p-0">
          {applications.map((application) => (
            <div class="row">
              <li className="my-1">
                <div className="card-face">
                  <Card
                    key={application.appId}
                    onClick={(e) => handleAppClick(e, application.appName)}
                    
                  >
                    <div class="row px-1 ps-2">
                      <div class="col col-auto
                      align-self-center">
                        {application.appName[0]}
                      </div>
                      <div class="col">
                        <Card.Body class="py-2">
                          <Card.Title class="text-start c-title">
                            App: {application.appName}
                          </Card.Title>
                          <Card.Subtitle class="text-start c-subtitle">
                            Repo: {application.repo}
                          </Card.Subtitle>
                        </Card.Body>
                      </div>
                      <div class="col col-auto 
                      align-self-center 
                      
                      pe-4">
                        <div class="row dep d-flex justify-content-end">Last Deployed</div>
                        <div class="row date">Oct 25, 2022 2:00pm</div>
                      </div>
                    </div>
                  </Card>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Applications;
