import React, { useState, useEffect } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
// useHistory - to know where we came from,
// useLocation - to know where we are right now
import { useHistory, useLocation } from "react-router-dom";

// chip input form tags
import ChipInput from "material-ui-chip-input";

import Posts from "../posts/Posts";
import Form from "../form/Form";
import Pagination from "../Pagination";
// import a hook from react-redux, allows to dispatch and action
import { useDispatch } from "react-redux";

import { getPosts, getPostsBySearch } from "../../actions/posts";
import useStyles from "./styles";

function useQuery() {
  // to get which page we are on currently
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0);

  // used to add classes to every part of component individually
  // calling useStyles as a hook
  const classes = useStyles();
  const dispatch = useDispatch();
  // from here we will get our page info
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  // dispatch our action inside of useEffect
  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [currentId, dispatch]);

  const searchPost = () => {
    if (search || tags) {
      // dispatch -> fetch search post , use redux, modify our database to only search for specific posts
      // create a redux action and a reducer to manage our post
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      // search for the post
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  {
    /* grow provides animation */
  }

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          {/* adding grid items */}
          <Grid item xs={12} sm={6} md={9}>
            {/* xs - xtra small devices */}
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Post"
                fullWidth
                value={search}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
