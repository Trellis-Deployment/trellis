import "../../stylesheets/AppActivity.css";
import { useRef, useEffect } from "react";

const Logs = (logs = "") => {
  console.log("These are logs", logs.logs);
  const logText = logs.logs;
  const textArea = useRef();

  useEffect(() => {
    const area = textArea.current;
    area.scrollTop = area.scrollHeight;
  });

  return (
    <div className="row m-1 form-floating">
      <textarea
        className="logs my-1"
        id="floatingTextarea"
        value={logText}
        readOnly={true}
        ref={textArea} // This links the useRef() hook to this object in the dom
      />
    </div>
  );
};

export default Logs;
