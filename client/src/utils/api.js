import fetch from "isomorphic-fetch";

const BASE_URL =
  "http://ec2-3-136-159-241.us-east-2.compute.amazonaws.com:5000/api";

export const login = (body) => {
  console.log(body);
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
  console.log(body);
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};
