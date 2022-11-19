import { AUTH } from "../constants/actionTypes";

// here we have to use index.js file of api folder
import * as api from "../api";

// redux flow
// 1. we go to form [present in Auth.js in Auth component]
// 2. once we fill all details, we dispatch an action signUp, signIn [giving formData and history]
// 3. we reach actions signup, signin here in actions folder
// 4. now the specific action makes another call to our api [index.js has all the api endpoints]
// 5. axios makes a post request to the database, and in-turn gets a {data}
// 6. then from our action creator we dispatch the action with an action type, with payload data
// 7. this action reaches reducer auth.js in reducers folder
// 8. where specific action type deals with the the payload in action.data

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
