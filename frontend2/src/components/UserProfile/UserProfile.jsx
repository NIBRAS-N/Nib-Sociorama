import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  followAndUnfollowUser,
  getUserPosts,
  getUserProfile,
} from "../../Actions/user.actions.js";
import {Loader,Post,User} from "../../index.js"
import Swal from 'sweetalert2';
import {clearErrorsUserPostsSlice} from "../../Slices/userPostSlice.js"
import {clearErrorsLikeSlice,clearMessage} from "../../Slices/likeSlice.js"
import {clearErrorsUserProfileSlice} from "../../Slices/userProfileSlice.js"

const UserProfile = () => {
  const dispatch = useDispatch();
  

  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.userProfile);

  const { user: me } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.userPosts);
  const {
    error: followError,
    message,
    loading: followLoading,
  } = useSelector((state) => state.like);

  const params = useParams();
  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  const followHandler = async () => {
    setFollowing(!following);
    await dispatch(followAndUnfollowUser(user._id));
    dispatch(getUserProfile(params.id));
  };

  useEffect(() => {
    dispatch(getUserPosts(params.id));
    dispatch(getUserProfile(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (me?._id === params?.id) {
      setMyProfile(true);
    }
    if (user) {
      user?.followers?.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
  }, [user, me?._id, params?.id]);

  useEffect(() => {
    if (error) {
            Swal.fire({
                position: "bottom",
                icon: "warning",
                title: `error in fetching user post , ${error}`,
                showConfirmButton: false,
                timer: 2000
        });
      dispatch(clearErrorsUserPostsSlice());
    }

    if (followError) {
        Swal.fire({
            position: "bottom",
            icon: "warning",
            title: ` ${error}`,
            showConfirmButton: false,
            timer: 2000
    });
      dispatch(clearErrorsLikeSlice());
    }

    if (userError) {
        Swal.fire({
            position: "bottom",
            icon: "warning",
            title: ` ${error}`,
            showConfirmButton: false,
            timer: 2000
    });
      dispatch(clearErrorsUserProfileSlice());
    }
    if (message) {
        Swal.fire({
            position: "bottom",
            icon: "success",
            title: ` ${message}`,
            showConfirmButton: false,
            timer: 2000
    });
      dispatch(clearMessage());
    }
  }, [ error, message, followError, userError, dispatch]);

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {posts && posts?.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post?._id}
              postId={post?._id}
              caption={post?.caption}
              postImage={post?.image?.url}
              likes={post?.likes}
              comments={post?.comments}
              ownerImage={post?.owner?.avatar?.url}
              ownerName={post?.owner?.name}
              ownerId={post?.owner?._id}
              userProfile={true}
              userId2={user?._id}
            />
          ))
        ) : (
          <Typography variant="h6">User has not made any post</Typography>
        )}
      </div>
      <div className="accountright">
        {user && (
          <>
            <Avatar
              src={user?.avatar?.url}
              sx={{ height: "8vmax", width: "8vmax" }}
            />

            <Typography variant="h5">{user?.name}</Typography>

            <div>
              <button onClick={() => setFollowersToggle(!followersToggle)}>
                <Typography>Followers</Typography>
              </button>
              <Typography>{user?.followers?.length}</Typography>
            </div>

            <div>
              <button onClick={() => setFollowingToggle(!followingToggle)}>
                <Typography>Following</Typography>
              </button>
              <Typography>{user?.following?.length}</Typography>
            </div>

            <div>
              <Typography>Posts</Typography>
              <Typography>{user?.posts?.length}</Typography>
            </div>

            {myProfile ? null : (
              <Button
                variant="contained"
                style={{ background: following ? "red" : "" }}
                onClick={followHandler}
                disabled={followLoading}
              >
                {following ? "Unfollow" : "Follow"}
              </Button>
            )}
          </>
        )}
        <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>

            {user && user?.followers?.length > 0 ? (
              user?.followers.map((follower) => (
                <User
                  key={follower?._id}
                  userId={follower?._id}
                  name={follower?.name}
                  avatar={follower?.avatar?.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                {user.name} have no followers
              </Typography>
            )}
          </div>
        </Dialog>

        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Following</Typography>

            {user && user?.following?.length > 0 ? (
              user.following.map((follow) => (
                <User
                  key={follow?._id}
                  userId={follow?._id}
                  name={follow?.name}
                  avatar={follow?.avatar?.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                {user.name} is not following anyone
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default UserProfile;