import React,{useEffect,useAlert} from "react";
import {Loader,Post,User} from "../../index.js"
import "./Home.css"
import { useDispatch,useSelector } from "react-redux";
import {getFollowingPosts,getAllUsers} from "../../Actions/user.actions.js"
import Swal from 'sweetalert2';
import { Typography } from "@mui/material";
import {clearErrorPostOfFollowingSlice} from "../../Slices/postOfFollowingSlice.js"
import {clearErrorsLikeSlice,clearMessage} from "../../Slices/likeSlice.js"
 function Home () {
  const dispatch = useDispatch();
  
  
  const { loading, posts, error } =  useSelector(
    (state) => state.postOfFollowing
  );
    // console.log(posts[0]._id)
    // console.log("loading ",loading," posts ",posts)

  const { users, loading: usersLoading } =  useSelector( (state) => state.allUsers);
    // console.log("loading ",usersLoading," posts ",users)


  const { error: likeError, message } = useSelector((state) => state.like); 

  useEffect( () => {
     dispatch(getFollowingPosts());
     dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        position: "bottom",
        icon: "warning",
        title: "Something wrong on fetching your following persons post",
        showConfirmButton: false,
        timer: 2000
      });
      dispatch(clearErrorPostOfFollowingSlice());
    }

    if (likeError) {
      Swal.fire({
        position: "bottom",
        icon: "warning",
        title: "Something wrong on liking and unliking the post",
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
     dispatch(clearMessage());
    }
  }, [ error, message, likeError, dispatch]);




  
  return loading === true || usersLoading === true ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeleft">
        {/* <h1>Posts will be shown here</h1> */}
        {posts && posts.length > 0 ? (
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
        )}
      </div>
      <div className="homeright">
        {/* <h1>User will be shown here</h1> */}
        {users && users?.length > 0 ? (
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
        )}
      </div>
    </div>
  );
}

export default Home;
