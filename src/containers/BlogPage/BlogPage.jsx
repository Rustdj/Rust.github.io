import "./BlogPage.css";
import { BlogCard } from "./components/BlogCard";
import AddPostForm from "./components/AddPostForm";
import React, { useState } from "react";
import EditPostForm from "./components/EditPostForm";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import {
  useAddPost,
  useDeletePost,
  useEditPost,
  useGetPosts,
  useLikePost,
} from "../../shared/queries";

//let source;

export const BlogPage = ({ isAdmin }) => {
  const [form, setForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  const onClose = () => setForm(false);
  const editClose = () => setEditForm(false);

  const {
    data: posts,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useGetPosts();

  // customHooks
  const likeMutation = useLikePost();
  const deleteMutation = useDeletePost();
  const addMutation = useAddPost();
  const editMutation = useEditPost();

  // loading
  if (isError) return <h1>Error {error.message}</h1>;
  if (isLoading) return <h1>LOADING...</h1>;

  // liked
  const likePost = (blogPost) => {
    const updatePost = { ...blogPost };
    updatePost.liked = !updatePost.liked;

    likeMutation
      .mutateAsync(updatePost)
      .then(refetch)
      .catch((err) => console.log(err));
  };

  // addNewBlogPost
  const addNewBlogPost = (blogPost) => {
    addMutation
      .mutateAsync(blogPost)
      .then(refetch)
      .catch((err) => console.log(err));
  };

  //editBlogPost
  const editBlogPost = (updateBlogPost) => {
    editMutation
      .mutateAsync(updateBlogPost)
      .then(refetch)
      .catch((err) => console.log(err));
  };

  // delete posts
  const deletePost = (blogPost) => {
    if (window.confirm(`Удалить ${blogPost.title}?`)) {
      deleteMutation
        .mutateAsync(blogPost)
        .then(refetch)
        .catch((err) => console.log(err));
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
        <Link
          style={{ textDecoration: "none" }}
          className="moreDet"
          to={`/blog/${item.id}`}
        >
          More
        </Link>
      </React.Fragment>
    );
  });

  const postsOpacity = isFetching ? 0.5 : 1;

  return (
    <>
      {isFetching && <CircularProgress color="inherit" />}
      {form}
      {isAdmin && (
        <div onClick={showModal} className="modalAdd">
          <button>Add post</button>
        </div>
      )}
      <div className="parentPost" style={{ opacity: postsOpacity }}>
        {blogPost}
      </div>

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
          addNewBlogPost={addNewBlogPost}
          closeModal={closeModal}
        />
      ) : null}
    </>
  );
};
