import axios from "axios";

// address where requests will be made , url pointing to our backend route
// const url = "http://localhost:5000/posts";

// axios instance
const API = axios.create({ baseURL: "https://bsocial-backend.onrender.com" });
// api will now make different calls to posts, users etc

// https://bsocial-api.onrender.com
// https://bsocial-backend.onrender.com
// this function will happen on each one of the request
// adding the token to each and every request so that user functionality works properly
// we send our token back to our backend and verify that we are logged in
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    // sending the token
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPost = (id) => API.get(`posts/${id}`);

export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}
    &tags=${searchQuery.tags}`
  );

export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });

// api endpoints for form Submit for signin and signup
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
