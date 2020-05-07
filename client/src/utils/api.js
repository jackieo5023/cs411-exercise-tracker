import fetch from "isomorphic-fetch";

const BASE_URL = "https://ec2-3-22-192-238.us-east-2.compute.amazonaws.com:5000/api";

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

export const getCompletedWorkouts = (body) => {
  return fetch(`${BASE_URL}/me/workout?completed=true`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      id: body.id,
    },
  }).then((res) => res.json());
};

export const getSuggestedWorkouts = (body) => {
  return fetch(`${BASE_URL}/me/workout?completed=false`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      id: body.id,
    },
  }).then((res) => res.json());
};

export const addCompletedWorkout = (body) => {
  const { id, ...rest } = body;
  console.log(rest);
  return fetch(`${BASE_URL}/me/workout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      id: id,
    },
    body: JSON.stringify(rest),
  }).then((res) => res.json());
};

export const deleteWorkout = (body) => {
  const { id, ...rest } = body;
  return fetch(`${BASE_URL}/me/workout`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      id: body.id,
    },
    body: JSON.stringify(rest),
  }).then((res) => res.json());
};

export const getSuggestedRecipes = (body) => {
  return fetch(`${BASE_URL}/recommended_recipes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      id: body.id,
    },
  }).then((res) => res.json());
};

export const getRecipes = (body) => {
  return fetch(`${BASE_URL}/recipe`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      id: body.id,
    },
  }).then((res) => res.json());
};

export const addRecipe = (body) => {
  const { id, ...rest } = body;
  return fetch(`${BASE_URL}/recipe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      id: id,
    },
    body: JSON.stringify(rest),
  }).then((res) => res.json());
};

export const deleteRecipe = (body) => {
  const { id, ...rest } = body;
  console.log(rest);
  return fetch(`${BASE_URL}/recipe`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      id: id,
    },
    body: JSON.stringify(rest),
  }).then((res) => res.json());
};
