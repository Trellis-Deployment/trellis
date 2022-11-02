import '../../App.css';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAppContext } from '../../Lib/AppContext';
import APICalls from '../../services/APICalls';

const BranchSettings = ({ stage, setBranchSettingsVisible, stages, setStages }) => {
  const { appName, userId } = useAppContext();
  const [repoBranches, setRepoBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(stage.stageBranch);

  const loadBranches = async () => {
    try {
      const branches = await APICalls.getRepoBranches({ userId, appName });
      setRepoBranches(branches);
    } catch (e) {
      console.log(`error fetching repo branches for app ${appName}`, e)
    }
  }
  
  useEffect(() => {
    loadBranches();
  }, []);
  
  const handleScreenClick = (e) => {
    if (e.target.classList.contains('screen')) {
      setBranchSettingsVisible(false)
    }
  }

  const handleBranchChangeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await APICalls.setStageBranch({ stageId: stage.stageId, branchName: selectedBranch });
      console.log(typeof setStages);
      if (response.status === 200) {
        setBranchSettingsVisible(false);
        const updatedStages = stages.map(s => s.stageId === stage.stageId ? { ...s, stageBranch: selectedBranch } : s)
        console.log({ updatedStages });
        setStages(updatedStages);
      }
    } catch(e) {
      console.log(``)
    }
  }

  return (
    <>
    <div className="screen" onClick={handleScreenClick}>
    </div>
      <div className="modal">
        { repoBranches.length === 0 ? 
          <p>Loading branches</p> :
          <>
            <p>Change git branch for stage {stage.stageName}:</p>
            <Form onSubmit={handleBranchChangeSubmit}>
              <Form.Select aria-label='branch select' value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
                {
                  repoBranches.map(branch => <option key={branch.name} value={branch.name}>{branch.name}</option>)
                }
              </Form.Select>
              <Button variant='primary' type='submit'>Submit</Button>
            </Form>
          </>
        }
      </div>
    </>
  )
}

export default BranchSettings