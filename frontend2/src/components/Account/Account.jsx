import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {Loader,Post,User} from "../../index.js"
import "./Account.css";
import Swal from 'sweetalert2';
import {getMyPosts,logoutUser,deleteMyProfile, loadUser} from "../../Actions/user.actions.js"
import {clearErrorsMyPostSlice} from "../../Slices/myPostSlice.js"
import {clearErrorsLikeSlice,clearMessage} from "../../Slices/likeSlice.js"

import {useNavigate} from 'react-router-dom'


const Account = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { loading, error, posts } =  useSelector((state) => state.myPosts);
    const { user, loading: userLoading } =useSelector((state) => state.user);
    // console.log(posts._id)
    // console.log(user)
    const {error: likeError, message, loading: deleteLoading} = useSelector((state) => state.like);

    const [followersToggle, setFollowersToggle] = useState(false);

    const [followingToggle, setFollowingToggle] = useState(false);

    const logoutHandler = async() => {
      await dispatch(logoutUser());
      navigate("/")
    };

    const deleteProfileHandler = async () => {
      await dispatch(deleteMyProfile());
      await dispatch(loadUser())
      // await dispatch(logoutUser());
    };

    useEffect(() => {
        dispatch(getMyPosts());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
          Swal.fire({
              position: "bottom",
              icon: "warning",
              title: `${error}`,
              showConfirmButton: false,
              timer: 2000
          });
            dispatch(clearErrorsMyPostSlice());
        }
    
        if (likeError) {
            
                Swal.fire({
                    position: "bottom",
                    icon: "warning",
                    title: `${likeError}` ,
                    showConfirmButton: false,
                    timer: 2000
                });
            dispatch(clearErrorsLikeSlice());
        }

        if (message) {

            Swal.fire({
              position: "bottom",
              icon: "success",
              title: `${message}`,
              showConfirmButton: false,
              timer: 2000
          });
          dispatch(clearMessage())
        }
    }, [ error, message, likeError, dispatch]);


      return loading === true || userLoading === true ? (
        <Loader />
      ) : (
        <div className="account">
          <div className="accountleft">
            <h1>Post will be shown here</h1>
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
                  isAccount={true}
                  isDelete={true}
                />
              ))
            ) : (
              <Typography variant="h6">You have not made any post</Typography>
            )}
          </div>
          <div className="accountright">
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
    
            <Button variant="contained"
                onClick={logoutHandler}
            >
              Logout
            </Button>
    
            <Link to="/update/profile">Edit Profile</Link>
            <Link to="/update/password">Change Password</Link>
    
            <Button
              variant="text"
              style={{ color: "red", margin: "2vmax" }}
              onClick={deleteProfileHandler}
              disabled={deleteLoading}
            >
              Delete My Profile
            </Button>
    
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
                    ${user.name} have no followers
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
                    You're not following anyone
                  </Typography>
                )}
              </div>
            </Dialog>
          </div> 
        </div>
      );
};

export default Account;
