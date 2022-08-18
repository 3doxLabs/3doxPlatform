import React, { useState, useReducer, useEffect, useRef } from "react";
import AppContext from "../context/context";
import io from "socket.io-client";

const socketUrl = process.env.REACT_APP_SOCKET_URL;

const AppState = (props) => {
  const [user, setUser] = useState({
    username: null,
    firstName: null,
    lastName: null,
    expertise: null,
    country: null,
    timezone: null,
    address: null,
    avatar: null,
    balance: 0,
    rating: 0,
    karma: 0,
    reviews: 0,
    experience: [],
    skills: [],
    earned: 0,
    spent: 0,
  });

  let socket = useRef(null);

  useEffect(() => {
    socket.current = io(socketUrl, {
      autoConnect: true,
      upgrade: true,
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
