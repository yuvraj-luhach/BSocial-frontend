import React from "react";
import { Container } from "@material-ui/core";

// react-router-dom
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// importing necessary components
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails.jsx";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    // implementing react router, wrap everything in BrowserRouter
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          {/* post details path */}
          <Route path="/posts/:id" component={PostDetails} />

          <Route path="/auth" exact component={() => <Auth />} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
