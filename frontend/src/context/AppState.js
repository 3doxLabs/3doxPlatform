import React, { useState, useReducer, useEffect, useRef } from "react";
import AppContext from "../context/context";
import io from "socket.io-client";

const socketUrl = process.env.REACT_APP_SOCKET_URL;

const AppState = (props) => {
  const [user, setUser] = useState({
    username: "",
    address: "",
    avatar: "",
    balance: null,
    rating: null,
    reviews: null,
    experience: [],
    skills: [],
    earned: null,
    spent: null,
  });

  let socket = useRef(null);

  useEffect(() => {
    socket.current = io(socketUrl, {
      autoConnect: true,
      upgrade: false,
      transports: ["websocket"],
      withCredentials: true,
      cookie: true,
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        socket,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
