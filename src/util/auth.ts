import { history } from "../history";
import { client } from "../graphql/client";
import { GET_USER } from "../graphql/queries";

let loggedIn = false;

export const logout = () => {
  localStorage.removeItem("token");
  loggedIn = false;

  history.push("/login");
};

export const login = (token: string) => {
  localStorage.setItem("token", token);
  loggedIn = true;
  history.push("/compendium");
};

export const getUser = async () => {
  const { data } = await client.query({ query: GET_USER });
  if (data) {
    await client.writeData({ data: { userData: data.user } });
    return data.user;
  } else {
    return null;
  }
};

export const isLoggedIn = () => {
  return loggedIn;
};

export const getToken = () => {
  return localStorage.getItem("token");
};
