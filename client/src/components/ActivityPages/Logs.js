import "../../stylesheets/AppActivity.css";
import { useRef, useEffect } from "react";
import { Row } from "react-bootstrap";

const Logs = (logs = "") => {
  const logText = logs.logs;
  const textArea = useRef();

  useEffect(() => {
    const area = textArea.current;
    area.scrollTop = area.scrollHeight;
  });

  return (
    <Row className="m-1 form-floating">
      <textarea
        className="logs my-1"
        id="floatingTextarea"
        value={logText}
        readOnly={true}
        ref={textArea} // This links the useRef() hook to this object in the dom
      />
    </Row>
  );
};

export default Logs;
