import "../stylesheets/Applications.css";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import APICalls from "../services/APICalls";
import { useNavigate } from "react-router-dom";
// import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";

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
    <div className="app-list-home container">
      <div className="row pb-2">
        <div className="col col-auto">
          <h3 className="text-start">Welcome {authUser}</h3>
        </div>
        <div className="col d-flex justify-content-end">
          <Button
            onClick={handleNewAppClick}
            variant="light"
            size="sm"
          >
            &#43; New App
          </Button>
        </div>
      </div>
      <div className="row bg-black mt-3">
        <ul className="container p-0">
          {applications.map((application) => (
            <div key={application.appId} className="row">
              <li className="my-1">
                <div className="card-face">
                  <Card
                    key={application.appId}
                    onClick={(e) => handleAppClick(e, application.appName)}
                    
                  >
                    <div className="row px-1 ps-2">
                      <div className="col col-auto
                      align-self-center">
                        {application.appName[0]}
                      </div>
                      <div className="col">
                        <Card.Body className="py-2">
                          <Card.Title className="text-start c-title">
                            App: {application.appName}
                          </Card.Title>
                          <Card.Subtitle className="text-start c-subtitle">
                            Repo: {application.repo}
                          </Card.Subtitle>
                        </Card.Body>
                      </div>
                      <div className="col col-auto 
                      align-self-center 
                      
                      pe-4">
                        <div className="row dep d-flex justify-content-end">Last Deployed</div>
                        <div className="row date">Oct 25, 2022 2:00pm</div>
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
