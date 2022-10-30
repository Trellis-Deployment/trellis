const DisabledButton = () => {
  return (
    <div>
      {/* <a className="Button" href="/">
        Sign up
      </a> */}

      <button className="Button Button--default is-disabled" type="button">
        Close
      </button>
      <button
        type="submit"
        className="btn btn-primary btn-lg btn-block btn-light-loading"
        data-test-id="signUpButton"
        href="/Apps">
        <span>Sign up</span>
        <div className="loader loader-sm loader-white">
          <div className="prong">
            <div className="inner"></div>
          </div>
          <div className="prong">
            <div className="inner"></div>
          </div>
          <div className="prong">
            <div className="inner"></div>
          </div>
          <div className="prong">
            <div className="inner"></div>
          </div>
          <div className="prong">
            <div className="inner"></div>
          </div>
          <div className="prong">
            <div className="inner"></div>
          </div>
          <div className="prong">
            <div className="inner"></div>
          </div>
          <div className="prong">
            <div className="inner"></div>
          </div>
          <div className="prong">
            <div className="inner"></div>
          </div>
          <div className="prong">
            <div className="inner"></div>
          </div>
          <div className="prong">
            <div className="inner"></div>
          </div>
          <div className="prong">
            <div className="inner"></div>
          </div>
        </div>
      </button>
    </div>
  );
};


export default DisabledButton;
