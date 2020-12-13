import dotenv from "dotenv";

dotenv.config();

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const loginHandler = (): void => {
  fetch(`/api/checkValidSession`, {
    method: "GET",
  })
    .then((res) => {
      // refresh the page to login user
      if (res.status === 200) {
        window.location.href = "/";
      } else {
        throw new Error();
      }
      return res.json();
    })
    .catch((err) => {
      console.error(err);
      window.location.href = `${REACT_APP_BACKEND_URL}/api/login`;
    });
};

export default loginHandler;
