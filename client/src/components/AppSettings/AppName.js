import { Col, Card } from "react-bootstrap";
const AppName = ({appName}) => {
  return (
    <Col className="py-1 stage-row m-1 my-2 bh-bla">
      <Card.Title className="SectionHeader text-start">
        Application Name:
      </Card.Title>
      <Card.Text>
        {appName}
      </Card.Text>
    </Col>
  )
}

export default AppName;