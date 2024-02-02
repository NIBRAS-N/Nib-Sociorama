import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./CommentCard.css";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {deleteCommentOnPost} from "../../Actions/post.actions.js"
import { getFollowingPosts , getMyPosts ,getUserPosts} from "../../Actions/user.actions.js";

import Swal from 'sweetalert2';
const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
  userProfile,
  userId2
}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const deleteCommentHandle = async() => {
    await dispatch(deleteCommentOnPost(postId, commentId));
    
    if (isAccount) {
      // console.log("from form")
      await dispatch(getMyPosts());
    } 
    else if(userProfile){
      await dispatch(getUserPosts(userId2))
    }
    else {
      await dispatch(getFollowingPosts());
    }
  };

  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography style={{ minWidth: "6vmax" , paddingRight :"1vmax"}}>{name}</Typography>
      </Link>
      <Typography>{comment}</Typography>

      {isAccount     ? (
        <Button 
            onClick={deleteCommentHandle}
        >
          <Delete />
        </Button>
      ) : userId === user._id ? (
        <Button
             onClick={deleteCommentHandle}
        >
          <Delete />
        </Button>
      ) : null}
    </div>
  );
};

export default CommentCard;