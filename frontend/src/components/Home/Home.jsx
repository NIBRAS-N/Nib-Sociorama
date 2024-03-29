import React,{useEffect,useAlert} from "react";
import {User,Post,Loader} from "../index.js";
import "./Home.css"
import { useDispatch,useSelector } from "react-redux";
import { getFollowingPosts } from "../../Actions/user.action.js";
// import { getAllUsers } from "../../Actions/user.action.js";
import { Typography } from "@mui/material";
// import {Loader} from "../index.js";

function Home() {
  // const dispatch = useDispatch();
  // const alert = useAlert();

  // const { loading, posts, error } = useSelector(
  //   (state) => state.postOfFollowing
  // );
  
    // console.log("loading ",loading," posts ",posts)
  // const { users, loading: usersLoading } = useSelector(
  //   (state) => state.allUsers
  // );
    // console.log("loading ",usersLoading," posts ",users)


  // const { error: likeError, message } = useSelector((state) => state.like); 

  // useEffect( () => {
  //   dispatch(getFollowingPosts());
  //   // dispatch(getAllUsers());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (error) {
  //     alert.error(error);
  //     dispatch(clearErrors());
  //   }

  //   if (likeError) {
  //     alert.error(likeError);
  //     dispatch(clearErrors());
  //   }
  //   if (message) {
  //     alert.success(message);
  //     dispatch(clearErrors());
  //   }
  // }, [alert, error, message, likeError, dispatch]);



  // || usersLoading === true
  
  return loading === true  ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeleft">
        <h1>Posts will be shown here</h1>
        {/* {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post?._id}
              postId={post?._id}
              caption={post?.caption}
              postImage={post?.image.url}
              likes={post?.likes}
              comments={post?.comments}
              ownerImage={post?.owner.avatar.url}
              ownerName={post?.owner.name}
              ownerId={post?.owner._id}
            />
          ))
        ) : (
          <Typography variant="h6">No posts yet</Typography>
        )} */}
      </div>
      <div className="homeright">
        <h1>User will be shown here</h1>
        {/* {users && users?.length > 0 ? (
          users.map((user) => (
            <User
              key={user?._id}
              userId={user?._id}
              name={user?.name}
              avatar={user?.avatar.url}
            />
          ))
        ) : (
          <Typography>No Users Yet</Typography>
        )} */}
      </div>
    </div>
  );
}

export default Home;
