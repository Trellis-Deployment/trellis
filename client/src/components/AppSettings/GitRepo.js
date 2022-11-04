import { Row, Col, Card } from "react-bootstrap";

const GitRepo = ({repo}) => {
  return (
    <Row className="py-1 stage-row m-1 my-2 bh-bla">
      <Card.Title className="SectionHeader text-start">
        Git Repo:
      </Card.Title>
      <Card.Text>
        {repo}
      </Card.Text>
    </Row>
  )
}

export default GitRepo;