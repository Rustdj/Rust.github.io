import "./BlogPage.css";
import { BlogCard } from "./components/BlogCard";
import AddPostForm from "./components/AddPostForm";
import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import EditPostForm from "./components/EditPostForm";
import CircularProgress from "@mui/material/CircularProgress";
import { postsUrl } from "../../shared/projectData";

export const BlogPage = ({ isAdmin }) => {
  const [listData, setListData] = useState([]);
  const [form, setForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [pending, setPending] = useState(false);

  const onClose = () => setForm(false);
  const editClose = () => setEditForm(false);

  // API async
  let source;
  const fetchPosts = () => {
    source = axios.CancelToken.source();
    axios.get(postsUrl).then((response) => {
      console.log("Getting posts =>", response.data);
      setListData([...listData, ...response.data]);
    });
  };

  useEffect(() => {
    if (source) {
      source.cancel();
    }
    fetchPosts();
  }, []);

  // addNewBlogPost
  const addNewBlogPost = (blogPost) => {
    setPending(true);
    axios
      .post(postsUrl, blogPost)
      .then((response) => {
        console.log("Mounted post =>", response.data);
        fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //editBlogPost
  const editBlogPost = (updateBlogPost) => {
    axios
      .put(`${postsUrl}${updateBlogPost.id}`, updateBlogPost)
      .then((response) => {
        console.log("Correct post =>", response.data);
        fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // delete posts
  const deletePost = (blogPost) => {
    if (window.confirm(`Удалить ${blogPost.title}?`)) {
      setPending(true);
      axios
        .delete(`${postsUrl}${blogPost.id}`, blogPost)
        .then((response) => {
          console.log("Deleted post =>", response.data);
          fetchPosts();
          setPending(pending);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // liked
  const likePost = (blogPost) => {
    const temp = [...listData];
    temp[blogPost].liked = !temp[blogPost].liked;
    setListData(temp);
    axios
      .put(`${postsUrl}${blogPost.id}`, temp)
      .then((response) => {
        console.log("Liked post =>", response.data);
        //fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // loading
  if (listData.length === 0) <h1>LOADING...</h1>;

  // editPost
  const handleSelectPost = (blogPost) => {
    setSelectedPost(blogPost);
  };

  // showModal
  const showModal = () => {
    setForm(true);
  };

  // closeModal
  const closeModal = () => {
    setForm(false);
  };

  // showEditModal
  const showEditModal = () => {
    setEditForm(true);
  };

  // closeEditModal
  const closeEditModal = () => {
    setEditForm(false);
  };

  //console.log(selectedPost);
  return (
    <>
      {pending && <CircularProgress color="inherit" />}
      {form}
      {isAdmin && (
        <div onClick={showModal} className="modalAdd">
          <button>Add post</button>
        </div>
      )}

      {listData.map((item, elem) => {
        return (
          <BlogCard
            key={elem}
            liked={item.liked}
            thumbnailUrl={item.thumbnailUrl}
            title={item.title}
            body={item.body}
            description={item.description}
            showEditModal={showEditModal}
            likePost={() => likePost(elem)}
            deletePost={() => deletePost(item)}
            handleSelectPost={() => handleSelectPost(item)}
            isAdmin={isAdmin}
          />
        );
      })}

      {editForm && (
        <EditPostForm
          editClose={editClose}
          closeEditModal={closeEditModal}
          addNewBlogPost={addNewBlogPost}
          selectedPost={selectedPost}
          editBlogPost={editBlogPost}
        />
      )}

      {form ? (
        <AddPostForm
          setForm={setForm}
          onClose={onClose}
          listData={listData}
          addNewBlogPost={addNewBlogPost}
          closeModal={closeModal}
        />
      ) : null}
    </>
  );
};

{
  /* <Routes>
                
                
                  <Route exact path="/" element={() => {
                    if(isLoggerId) return <Navigate to="/blog"/>
                    return <Navigate to="/login" />
                  }} />
                

                <Route 
                  exact
                  path="/login" 
                  element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUserName={setUserName}/>}/>


                <Route 
                  exact
                  path="/blog" 
                  element={<BlogPage setIsLoggedIn={setIsLoggedIn} setUserName={setUserName}/>}/>

                  
  </Routes> */
}
