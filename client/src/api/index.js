import axios from "axios";
const url = "https://bakov2.herokuapp.com";
axios.defaults.withCredentials = true;
export const login = async (body) => {
  try {
    const { data } = await axios.post(`${url}/login`, body);
    return data;
  } catch (error) {
    // console.log(error.response);
    if (error.response) {
      return error.response.data;
    }
    return { Message: "Error occured", Error: true };
  }
};
export const register = async (body) => {
  try {
    const { data } = await axios.post(`${url}/register`, body);
    return data;
  } catch (error) {
    console.log(error.response);
    return { message: "Error Occured" };
  }
};
export const checkAuth = async () => {
  try {
    const data = await fetch(`${url}/auth/checkauth`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((rs) => rs.json());
    console.log(data);
    return { ...data };
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const getRoomMessages = async (body) => {
  try {
    const { data } = await axios.post(`${url}/auth/room/messages`, body);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
export const createRoom = async (body) => {
  try {
    const { data } = await axios.post(`${url}/auth/createroom`, body);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
export const joinRoom = async (body) => {
  try {
    const { data } = await axios.post(`${url}/auth/room/join`, body);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
export const logout = async () => {
  try {
    const { data } = await axios.get(`${url}/logout`);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
