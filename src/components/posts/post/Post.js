// component for the posts
import React, { useState, useEffect } from "react";

// material ui import
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  CardMedia,
  CardActionArea,
} from "@material-ui/core";

// import { ButtonBase } from "@mui/material";

import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import moment from "moment";

import useStyles from "./styles";

// importing reducers to dispatch the delete post action
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { useHistory } from "react-router-dom";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  const [likes, setLikes] = useState(post?.likes);

  // like subcomponent
  const Likes = () => {
    if (likes?.length > 0) {
      return likes?.find((id) => id === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes?.length > 2
            ? `You and ${likes?.length - 1} others`
            : `${likes?.length} like${likes?.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes?.length} {likes?.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  const userId = user?.result?.sub || user?.result?._id;
  const hasLiked = post?.likes?.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    // handling the frontend part since update to the database is asynchronous and they take time
    if (hasLiked) {
      setLikes(post?.likes?.filter((id) => id !== userId));
    } else {
      setLikes([...post?.likes, userId]);
    }
  };

  // tags, recommendedPosts

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardActionArea
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
        <div>
          {/* for image */}
          <CardMedia
            className={classes.media}
            image={post.selectedFile}
            title={post.title}
          />
          <div className={classes.overlay}>
            <Typography variant="h6">{post?.name}</Typography>
            <Typography variant="body2">
              {moment(post.createdAt).fromNow()}
            </Typography>
          </div>
          {(user?.result?.sub === post?.creator ||
            user?.result?._id === post?.creator) && (
            <div className={classes.overlay2}>
              <div
                style={{ color: "white" }}
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentId(post._id);
                }}
              >
                <MoreHorizIcon fontSize="medium" />
              </div>
            </div>
          )}
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
          </div>
          <Typography
            className={classes.title}
            variant="h5"
            gutterBottom
            component="h2"
          >
            {post.title}
          </Typography>
          <CardContent>
            <Typography
              color="textSecondary"
              variant="body2"
              component="p"
              noWrap="false"
            >
              {post.message}
            </Typography>
          </CardContent>
        </div>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes />
        </Button>
        {(user?.result?.sub === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
