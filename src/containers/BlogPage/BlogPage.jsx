import "./BlogPage.css";
import { BlogCard } from "./components/BlogCard";
import AddPostForm from "./components/AddPostForm";
import axios from "axios";
import React, { useState } from "react";
import EditPostForm from "./components/EditPostForm";
import CircularProgress from "@mui/material/CircularProgress";
import { postsUrl } from "../../shared/projectData";
import { Link } from "react-router-dom";
import { useDeletePost, useGetPosts, useLikePost } from "../../shared/queries";

//let source;

export const BlogPage = ({ isAdmin }) => {
  const [listData, setListData] = useState([]);
  const [form, setForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [pending, setPending] = useState(false);

  const onClose = () => setForm(false);
  const editClose = () => setEditForm(false);

  const { data: posts, isLoading, isError, error, isFetching, refetch } = useGetPosts();

  const likeMutation = useLikePost();
  const deleteMutation = useDeletePost();

  // loading
  if (isError) return <h1>Error {error.message}</h1>;
  if (isLoading) return <h1>LOADING...</h1>;


  // liked
  const likePost = (blogPost) => {
    const updatePost = { ...blogPost };
    updatePost.liked = !updatePost.liked;

    likeMutation.mutateAsync(updatePost)
      .then(refetch)
      .catch((err) => console.log(err))
  };

  // addNewBlogPost
  const addNewBlogPost = (blogPost) => {
    setPending(true);
    axios
      .post(postsUrl, blogPost)
      .then((response) => {
        console.log("Mounted post =>", response.data);
        //fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //editBlogPost
  const editBlogPost = (updateBlogPost) => {
    setPending(true);
    axios
      .put(`${postsUrl}${updateBlogPost.id}`, updateBlogPost)
      .then((response) => {
        console.log("Correct post =>", response.data);
        //fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // delete posts
  const deletePost = (blogPost) => {
    if (window.confirm(`Удалить ${blogPost.title}?`)) {
      deleteMutation.mutateAsync(blogPost)
        .then(refetch)
        .catch((err) => console.log(err))
    }
  };

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

  const blogPost = posts.map((item) => {
    return (
      <React.Fragment key={item.id}>
        <BlogCard
          liked={item.liked}
          thumbnailUrl={item.thumbnailUrl}
          title={item.title}
          body={item.body}
          description={item.description}
          showEditModal={showEditModal}
          likePost={() => likePost(item)}
          deletePost={() => deletePost(item)}
          handleSelectPost={() => handleSelectPost(item)}
          isAdmin={isAdmin}
        />
        <Link to={`/blog/${item.id}`}>Подробнее</Link>
      </React.Fragment>
    );
  });

  const postsOpacity = isFetching ? 0.5 : 1;

  return (
    <>
      {pending && <CircularProgress color="inherit" />}
      {form}
      {isAdmin && (
        <div onClick={showModal} className="modalAdd">
          <button>Add post</button>
        </div>
      )}
      {blogPost}

      {/* {posts.map((item, elem) => {
        return (
          <React.Fragment key={item.id}>
            <BlogCard
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
            <Link to={`/blog/${item.id}`}>Подробнее</Link>
          </React.Fragment>
        );
      })} */}

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
          //listData={listData}
          addNewBlogPost={addNewBlogPost}
          closeModal={closeModal}
        />
      ) : null}
    </>
  );
};
