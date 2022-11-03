import { useState } from "react";

const CommitId = ({ value }) => {
  const [fullIdVisible, setFullIdVisible] = useState(false);

  const handleIdClick = (e) => {
    e.preventDefault();
    setFullIdVisible(!fullIdVisible);
  };

  return (
    <a href="/" className="text-warning" onClick={handleIdClick}>
      {fullIdVisible ? value : `${value.slice(0, 5)}...`}
    </a>
  );
};

export default CommitId;
