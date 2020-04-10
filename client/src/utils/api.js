import fetch from "isomorphic-fetch";

const BASE_URL = "http://localhost:5000/api";
// "https://ec2-3-136-159-241.us-east-2.compute.amazonaws.com:5000/api";

export const login = (body) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));
};

export const register = (body) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

export const getPerson = (body) => {
  console.log(body);
  return fetch(`${BASE_URL}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      id: body.id,
    },
  }).then((res) => res.json());
};

export const updatePerson = (body) => {
  return fetch(`${BASE_URL}/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

export const deletePerson = (body) => {
  return fetch(`${BASE_URL}/me`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      id: body.id,
    },
  }).then((res) => res.json());
};
