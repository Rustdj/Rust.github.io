import "../../../App.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateIcon from "@mui/icons-material/Create";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import EditPostForm from "./EditPostForm";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useDeletePost,
  useEditPost,
  useGetSinglePosts,
  useLikePost,
} from "../../../shared/queries";

export const BlogCardPage = ({ isAdmin }) => {
  const correctText = "#c4c7c4";
  const { postId } = useParams();
  const [selectedPost, setSelectedPost] = useState({});
  const [pending, setPending] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const navigate = useNavigate();

  //=============

  const {
    data: posts,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useGetSinglePosts(postId);

  //customHooks
  const likeMutation = useLikePost();
  const deleteMutation = useDeletePost();
  const editMutation = useEditPost();

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

  //editBlogPost
  const editBlogPost = (updateBlogPost) => {
    editMutation
      .mutateAsync(updateBlogPost)
      .then(() => navigate("/blog"))
      .catch((err) => console.log(err));
  };

  // delete posts
  const deletePost = (blogPost) => {
    if (window.confirm(`Удалить ${blogPost.title}?`)) {
      deleteMutation
        .mutateAsync(blogPost)
        .then(() => navigate("/blog"))
        .catch((err) => console.log(err));
    }
  };

  // editPost
  const handleSelectPost = (blogPost) => {
    setSelectedPost(blogPost);
  };

  // showEditModal
  const showEditModal = (BlogPost) => {
    setEditForm(true);
    setSelectedPost(BlogPost);
  };

  // closeEditModal
  const closeEditModal = () => {
    setEditForm(false);
  };

  if (!posts.title) return <h1>LOADING...</h1>;
  const postsOpacity = pending ? 0.5 : 1;
  const heartFill = posts.liked ? "red" : "#c4c7c4";

  return (
    <>
      <div className="post" style={{ opacity: postsOpacity }}>
        {editForm && (
          <EditPostForm
            closeEditModal={closeEditModal}
            selectedPost={selectedPost}
            editBlogPost={editBlogPost}
          />
        )}
        <div className="title">{posts.title}</div>
        <hr />
        <p className="descr">{posts.description}</p>

        <button className="heartButton" onClick={() => likePost(posts)}>
          <FavoriteIcon style={{ fill: heartFill, fontSize: 25 }} />
        </button>
        {isAdmin && (
          <>
            <button
              className="correctText"
              onClick={() => showEditModal(posts)}
            >
              <CreateIcon style={{ fill: correctText, fontSize: 20 }} />
            </button>

            <button className="trashButton" onClick={() => deletePost(posts)}>
              <DeleteOutlineIcon style={{ fill: correctText, fontSize: 20 }} />
            </button>
          </>
        )}
      </div>
      {isFetching && <CircularProgress className="loader" />}
    </>
  );
};
