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
        <Card.Text className="card-info-key my-1 text-center">
          Current Application {property}: -{" "}
          <text className="card-info-value">{appValue}</text>
        </Card.Text>
      </Row>
      <Row>
      <Col className="text-center">
          {showForm ? (
            inputForm
          ) : (
            <Button variant="primary" className="bttn" onClick={handleUpdateClick}>Update App's {property}</Button>
          )}
        </Col>
      </Row>
    </Row>
  );
};

export default CardLayout;
