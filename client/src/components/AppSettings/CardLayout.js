import { Row, Card } from "react-bootstrap";

const CardLayout = ({property, appValue, inputForm}) => {
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
      {inputForm}
    </Row>
  )
}

export default CardLayout;