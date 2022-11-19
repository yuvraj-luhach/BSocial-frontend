// form component
import React, { useState, useEffect } from "react";

import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPost, updatePost } from "../../actions/posts";
import useStyles from "./styles";

// GET CURRENT ID OF THE POST

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();

  // gets the user from the localStorage
  const user = JSON.parse(localStorage.getItem("profile"));

  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );

  // this allows us to dispatch actions
  const dispatch = useDispatch();

  const history = useHistory();
  // states
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
    // convert an image into a base 64 string in a second
    selectedFile: "",
  });

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  // handles submit event in the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // currentId idicates the post we are editing
    // console.log(currentId);

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
    } else {
      dispatch(
        updatePost(currentId, {
          ...postData,
        })
      );
    }
    clear();
  };

  // clears the form
  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
  };

  // access denied to create post if user not logged in
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own post and like other's post.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      {/* paper is like a div that has whitish background */}
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${post.title}"` : "Creating a Post"}
        </Typography>

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          minRows={4}
          // whole data from the post is stored in postData object in the state , each object key is a specific text field
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
