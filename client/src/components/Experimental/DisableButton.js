// import { useEffect, useRef } from "react";
// import APICalls from "../../services/APICalls";
// import Stages from "./Stages";

const disableButton = () => {
  return (
    <div>
      <form novalidate="" class="d-flex flex-column">
        <div class="input input-lg with-label disabled">
          <label for="user_email" class="with-icon">
            Enter your email
          </label>
          <div class="input-area d-flex align-items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class=""
            >
              <g clip-path="url(#clip0)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1 8C1 5.79086 2.79086 4 5 4H19C21.2091 4 23 5.79086 23 8V17C23 19.2091 21.2091 21 19 21H5C2.79086 21 1 19.2091 1 17V8ZM5 6H19C19.9462 6 20.739 6.65711 20.9468 7.53989L12.6 13.8C12.2444 14.0667 11.7556 14.0667 11.4 13.8L3.05318 7.53989C3.26102 6.65711 4.05377 6 5 6ZM3 10V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V10L13.8 15.4C12.7333 16.2 11.2667 16.2 10.2 15.4L3 10Z"
                  fill="#3C4151"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="24" height="24" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
            <input
              id="user_email"
              type="text"
              placeholder="name@company.com"
              required=""
              autocomplete="off"
              class=""
              data-test-id="signUpEmailField"
              value=""
              disabled=""
            ></input>
          </div>
          <p class="input-feedback pl-2 m-0 mt-2"></p>
        </div>
        <button
          type="submit"
          class="btn btn-primary btn-lg btn-block btn-primary-loading"
          data-test-id="signUpButton"
        >
          {/* <span>Sign up</span>
          <div class="loader loader-sm loader-white">
            <div class="prong">
              <div class="inner"></div>
            </div>
            <div class="prong">
              <div class="inner"></div>
            </div>
            <div class="prong">
              <div class="inner"></div>
            </div>
            <div class="prong">
              <div class="inner"></div>
            </div>
            <div class="prong">
              <div class="inner"></div>
            </div>
            <div class="prong">
              <div class="inner"></div>
            </div>
            <div class="prong">
              <div class="inner"></div>
            </div>
            <div class="prong">
              <div class="inner"></div>
            </div>
            <div class="prong">
              <div class="inner"></div>
            </div>
            <div class="prong">
              <div class="inner"></div>
            </div>
            <div class="prong">
              <div class="inner"></div>
            </div>
            <div class="prong">
              <div class="inner"></div>
            </div>
          </div>
        </button>
        <div class="signin-separator my-14">
          <span class="fw-bold">OR</span> */}
        </div>
        <button
          type="button"
          class="btn btn-social mb-8 text-gray-700 btn-lg"
          data-test-id="signUpWithGoogleButton"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class=""
          >
            <path
              d="M37.9766 16.4093H36.4998V16.3332H19.9998V23.6665H30.3609C28.8493 27.9354 24.7876 30.9998 19.9998 30.9998C13.9251 30.9998 8.99984 26.0746 8.99984 19.9998C8.99984 13.9251 13.9251 8.99984 19.9998 8.99984C22.8039 8.99984 25.355 10.0577 27.2974 11.7856L32.483 6.6C29.2087 3.54842 24.8288 1.6665 19.9998 1.6665C9.87526 1.6665 1.6665 9.87525 1.6665 19.9998C1.6665 30.1244 9.87526 38.3332 19.9998 38.3332C30.1244 38.3332 38.3332 30.1244 38.3332 19.9998C38.3332 18.7706 38.2067 17.5707 37.9766 16.4093Z"
              fill="#FFC107"
            ></path>
            <path
              d="M3.78076 11.4666L9.80418 15.884C11.434 11.8488 15.3812 8.99984 20.0003 8.99984C22.8043 8.99984 25.3554 10.0577 27.2978 11.7856L32.4834 6.60001C29.2091 3.54842 24.8293 1.6665 20.0003 1.6665C12.9584 1.6665 6.85159 5.64209 3.78076 11.4666Z"
              fill="#FF3D00"
            ></path>
            <path
              d="M20 38.3337C24.7355 38.3337 29.0383 36.5215 32.2915 33.5744L26.6174 28.7729C24.7149 30.2197 22.3901 31.0023 20 31.0004C15.2315 31.0004 11.1825 27.9598 9.65721 23.7166L3.67871 28.3228C6.71288 34.2601 12.8747 38.3337 20 38.3337Z"
              fill="#4CAF50"
            ></path>
            <path
              d="M37.9768 16.4093H36.5V16.3333H20V23.6666H30.3611C29.638 25.6983 28.3356 27.4737 26.6147 28.7733L26.6174 28.7715L32.2916 33.573C31.8901 33.9378 38.3333 29.1666 38.3333 19.9999C38.3333 18.7707 38.2068 17.5708 37.9768 16.4093Z"
              fill="#1976D2"
            ></path>
          </svg>
          <span>Love Machine</span>
        </button>
        <div class="text-center mt-8 text-sm fw-medium">
          Already have an account?{" "}
          <a class="h8 text-underline" data-test-id="signInLink" href="/login">
            Sign in
          </a>
        </div>
      </form>
    </div>
  );
};


export default disableButton;