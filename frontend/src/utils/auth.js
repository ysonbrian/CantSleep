import axios from "axios";

const API_URL = "http://localhost:1234";

export const login = async (username, password) => {
  const { data } = await Axios.post(`${API_URL}/test/login`, {
    username,
    password,
  });

  if (data?.accessToken) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  return data;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const register = (username, password) => {
  return Axios.post(
    // `${API_URL}/test/register`,
    // {
    //   username,
    `${API_URL}/user`,
    {
      userName: username,
      password,
    }
    // { withCredentials: true }
  );
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
};

export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const Axios = axios.create({
  headers: authHeader(),
});
