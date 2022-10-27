import "../stylesheets/Applications.css";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import APICalls from "../services/APICalls";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { PlusCircle } from "react-bootstrap-icons";

const Applications = ({ authUser, userId }) => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

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
        <div className="col d-flex justify-content-end sush">
          <Button onClick={handleNewAppClick} size="sm" variant="light">
            <PlusCircle size={20} /> New App
          </Button>
        </div>
      </div>
      <div className="row mt-3">
        <ul className="container p-0">
          {applications.map((application) => (
            <div key={application.appId} className="row">
              <li className="my-1">
                <div className="card-face">
                  <Card
                    key={application.appId}
                    onClick={(e) => handleAppClick(e, application.appName)}
                  >
                    <div className="row mx-2 ps-2">
                      <div
                        className="col col-auto
                      align-self-center"
                      >
                        {<span class="badge bg-info">{application.appName[0]}</span>}
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
                      <div
                        className="col col-auto 
                      align-self-center 
                      
                      pe-4"
                      >
                        <div className="row dep d-flex justify-content-end">
                          Last Deployed
                        </div>
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
