// component for the posts
import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";

// helps in fetching the data from that global redux store
import { useSelector } from "react-redux";

import Post from "./post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  // fetching the posts from our state.posts
  const { posts, isLoading } = useSelector((state) => state.posts);
  // before - [] of posts
  // after - {posts: []}
  const classes = useStyles();

  // console.log(posts);

  if (!posts.length && !isLoading) return "No Posts";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
