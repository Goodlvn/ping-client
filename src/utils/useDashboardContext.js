import React, { useContext, useReducer } from "react";
import Actions from "./dashboardActions";

const DashboardContext = React.createContext({
  displayedFeed: [],
  board: "",
  details: "",
  selectedUser: null,
});

const initialState = {
  displayedFeed: [],
  board: "rawfeed",
  details: "",
  selectedUser: null,
  userPosition: null,
  viewport: {
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 13,
  },
};

function reducer(state, { type, payload }) {
  switch (type) {
    case Actions.TOGGLE_FEED:
      return {
        ...state,
        displayedFeed: payload,
      };
    case Actions.RAW_FEED:
      return {
        ...state,
        board: "rawfeed",
      };
    case "ping":
      return {
        ...state,
        board: "ping",
        details: payload,
      };
    case Actions.SELECT_USER:
      return {
        ...state,
        selectedUser: payload,
      };
    case Actions.CLEAR_USER:
      return {
        ...state,
        selectedUser: null,
      };
    case Actions.UPDATE_VIEWPORT:
      return {
        ...state,
        viewport: payload,
      };
    case Actions.UPDATE_USER_POSITION:
      return {
        ...state,
        userPosition: payload,
      };
    default:
      return state;
  }
}

function DashboardProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <DashboardContext.Provider value={{state, dispatch}} {...props} />;
}

const useDashboardContext = () => {
  return useContext(DashboardContext);
};

export { useDashboardContext, DashboardProvider };
