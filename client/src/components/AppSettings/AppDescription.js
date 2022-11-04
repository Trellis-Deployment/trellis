import { Col, Card } from "react-bootstrap";

const AppDescription = ({description}) => {
  return (
    <Col className="py-1 stage-row m-1 my-2 bh-bla">
      <Card.Title className="SectionHeader text-start">
        Application Description: 
      </Card.Title>
      <Card.Text>
        {description}
      </Card.Text>
    </Col>
  )
}

export default AppDescription;