import React, { createContext, useReducer, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import LoadingPepper from "../components/LoadingPepper";
import dotenv from "dotenv";

dotenv.config();

interface User {
  loggedIn: boolean;
  name: string;
  userID: string;
}

type Action =
  | {
      type: "login";
      payload: { name: string; userID: string };
    }
  | { type: "logout" };

const initialUser: User = {
  loggedIn: false,
  name: "",
  userID: "",
};

const reducers = (state: User, action: Action): User => {
  switch (action.type) {
    case "login":
      return { loggedIn: true, ...action.payload };
    case "logout":
      return { loggedIn: false, name: "", userID: "" };
    default:
      return state;
  }
};

export const UserContext = createContext<{
  user: User;
  logoutHandler: () => void;
}>({
  user: initialUser,
  logoutHandler: () => {
    return;
  },
});

const UserContextProvider: React.FC = ({ children }) => {
  const [user, dispatch] = useReducer(reducers, initialUser);
  const [loading, setLoading] = useState(true);

  const logoutHandler = () => {
    fetch(`/api/logout`, {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          dispatch({ type: "logout" });
        } else {
          throw new Error("unable to logout");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    setLoading(true);

    fetch(`/api/getMe`, {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("not yet logged in");
        }
      })
      .then((data) => {
        dispatch({
          type: "login",
          payload: {
            name: data.display_name,
            userID: data.id,
          },
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Container
          fluid
          className="outer-container"
          style={{ minHeight: "100vh" }}
        >
          <Container className="center-container">
            <LoadingPepper />
          </Container>
        </Container>
      ) : (
        <UserContext.Provider value={{ user, logoutHandler }}>
          {children}
        </UserContext.Provider>
      )}
    </>
  );
};

export default UserContextProvider;
