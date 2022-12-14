import APICalls from "../../services/APICalls";
import CardLayout from "./CardLayout";
import GitRepoForm from "./forms/GitRepoForm";
import { useState } from "react";

const GitRepo = ({ app, setApp}) => {
  const [ showForm, toggleShowForm ] = useState(false);

  const handleFormSubmit = async (repo) => {
    const newApp = {...app, repoName: repo};
    console.log({newApp});
    try {
      const data = await APICalls.putApp(newApp);
      if(data.error) {
        alert(data.error);
        return;
      }
      setApp(data);
    } catch(e) {
      console.log(e.message);
      alert(e.message);
    }
  }
  return (
    <CardLayout
      property="repo"
      appValue={app.repoName}
      showForm={showForm}
      toggleShowForm={toggleShowForm}
      inputForm={<GitRepoForm
        property="repo"
        onSubmit={handleFormSubmit}
        toggleShowForm={toggleShowForm}
      />}
    />
  )
}

export default GitRepo;

// import APICalls from "../../services/APICalls";
// import { Row, Card, Button, Form, Nav } from "react-bootstrap";
// import { useEffect, useState } from "react";
// import { useAppContext } from "../../Lib/AppContext";

// const AppDescription = ({ app, setApp }) => {
//   const [repo, setRepo] = useState("");
//   const [repos, setRepos] = useState([]);
//   const { userId } = useAppContext(); 
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     if(!repo) {
//       alert("Please, select a repo from the provided list");
//       return;
//     }
//     const newApp = {...app, repoName: repo};
//     try {
//       const data = await APICalls.putApp(newApp);
//       setApp(data);
//     } catch(e) {
//       console.log(e.message);
//       alert(e.message);
//     }
//   }

//   useEffect(() => {
//     const getRepos = async () => {
//       try {
//         const data = await APICalls.getRepos(userId);
//         setRepos(data);
//       } catch(e) {
//         console.log(e.message);
//         alert(e.message);
//       }
//     }
//     getRepos();
//   }, [userId]);

//   const CONFIGURE = `https://github.com/apps/${process.env.REACT_APP_GitHubApp}/installations/new`;

//   return (
//     <Row className="py-1 stage-row m-1 my-2 bh-bla">
//       <Card.Title className="SectionHeader text-start">
//         Application Repo:
//       </Card.Title>
//       <Card.Text>
//         Current Application Repo:
//         <br />
//         - {app.repoName}
//       </Card.Text>
//       <Form onSubmit={handleFormSubmit}>
//         <Form.Group>
//           <p className="text-start">Repo:</p>
//           <Form.Select
//             aria-label="select repo"
//             size="sm"
//             value={repo}
//             onChange={(e) => setRepo(e.target.value)}
//             required
//           >
//             <option>Click here to select a repo</option>
//             {repos.map((repo, idx) => (
//               <option key={idx}>{repo}</option>
//             ))}
//           </Form.Select>
//           <p className="text-center  pb-0 text-light fw-light">
//             <em>Don't see your repo? configure github</em>
//           </p>

//           <Nav.Link href={CONFIGURE}>
//             <div className="row d-flex pt-1">
//               <div className="col">
//                 <Button
//                   className="d-flex configure-git"
//                   variant="dark"
//                   size="dark"
//                 >
//                   Configure Github
//                 </Button>
//               </div>
//             </div>
//           </Nav.Link>
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Update App's Repo
//         </Button>
//       </Form>
//     </Row>
    
//   )
// }

// export default AppDescription;