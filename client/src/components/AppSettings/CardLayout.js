import { Row, Card, Col, Button } from "react-bootstrap";

const CardLayout = ({
  property,
  appValue,
  inputForm,
  showForm,
  toggleShowForm,
}) => {
  const handleUpdateClick = (e) => {
    e.preventDefault();
    toggleShowForm(!showForm);
  };
  return (
    <Row className="py-1 settings-row m-1 my-2">
      <Row>
        <Card.Title className="SectionHeader text-start">
          Application {property}:
        </Card.Title>
        <div className="card-text row card-info-key my-1 text-center">
          <div className="col col-auto">
            {" "}
            <p>Current Application {property}: - </p>
          </div>
          <div className="col col-auto">
            {" "}
            <p className="card-info-value">{appValue}</p>
          </div>
        </div>
      </Row>
      <Row>
        <Col className="text-center">
          {showForm ? (
            inputForm
          ) : (
            <Button
              variant="primary"
              className="bttn"
              onClick={handleUpdateClick}
            >
              Update App's {property}
            </Button>
          )}
        </Col>
      </Row>
    </Row>
  );
};

export default CardLayout;
