import { Row, Card, Button } from "react-bootstrap";

const CardLayout = ({property, appValue, inputForm, showForm, toggleShowForm}) => {
  const handleUpdateClick = (e) => {
    e.preventDefault();
    toggleShowForm(!showForm);
  }
  return (
    <Row className="py-1 stage-row m-1 my-2 bh-bla">
      <Card.Title className="SectionHeader text-start">
        Application {property}:
      </Card.Title>
      <Card.Text>
        Current Application {property}:
        <br />
        - {appValue}
      </Card.Text>
      {showForm ? inputForm :
        <Button onClick={handleUpdateClick}>
          Update Apps {property}
        </Button>
      }
    </Row>
  )
}

export default CardLayout;