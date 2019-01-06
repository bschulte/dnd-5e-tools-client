import { history } from "../history";

let loggedIn = false;

export const logout = () => {
  localStorage.removeItem("token");
  loggedIn = false;

  history.push("/login");
};

export const login = (token: string) => {
  localStorage.setItem("token", token);
  loggedIn = true;
  history.push("/");
};

export const isLoggedIn = () => {
  return loggedIn;
};

export const getToken = () => {
  return localStorage.getItem("token");
};
