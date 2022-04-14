import "../../../App.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateIcon from "@mui/icons-material/Create";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { postsUrl } from "../../../shared/projectData";
import EditPostForm from "./EditPostForm";
import CircularProgress from "@mui/material/CircularProgress";

export const BlogCardPage = ({ isAdmin }) => {
  const correctText = "#c4c7c4";
  const { postId } = useParams();
  const [selectedPost, setSelectedPost] = useState({});
  const [post, setPost] = useState({});
  const [pending, setPending] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const navigate = useNavigate();

  //=============

  // API async

  const fetchPost = (id) => {
    axios
      .get(postsUrl + id)
      .then((response) => {
        console.log(response.data);
        setPost(response.data);
        setPending(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPost(postId);
  }, [postId]);

  // liked
  const likePost = () => {
    const temp = { ...post };
    temp.liked = !temp.liked;

    axios
      .put(`${postsUrl}${postId}`, temp)
      .then((response) => {
        console.log("Liked post =>", response.data);
        fetchPost(postId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // delete posts
  const deletePost = () => {
    if (window.confirm(`Удалить ${post.title}?`)) {
      setPending(true);
      axios
        .delete(`${postsUrl}${postId}`)
        .then((response) => {
          console.log("Deleted post =>", response.data);
          setPending(false);
          fetchPost(postId);
          navigate.push("/blog");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //editBlogPost
  const editBlogPost = (updateBlogPost) => {
    setPending(true);
    axios
      .put(`${postsUrl}${postId}`, updateBlogPost)
      .then((response) => {
        console.log("Correct post =>", response.data);
        fetchPost(postId);
      })
      .catch((err) => {
        console.log(err);
      });
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

  if (!post.title) return <h1>LOADING...</h1>;
  const postsOpacity = pending ? 0.5 : 1;
  const heartFill = post.liked ? "red" : "#c4c7c4";

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
        <div className="title">{post.title}</div>
        <hr />
        <p className="descr">{post.description}</p>

        <button className="heartButton" onClick={likePost}>
          <FavoriteIcon style={{ fill: heartFill, fontSize: 25 }} />
        </button>
        {isAdmin && (
          <>
            <button className="correctText" onClick={() => showEditModal(post)}>
              <CreateIcon style={{ fill: correctText, fontSize: 20 }} />
            </button>

            <button className="trashButton" onClick={deletePost}>
              <DeleteOutlineIcon style={{ fill: correctText, fontSize: 20 }} />
            </button>
          </>
        )}
      </div>
      {pending && <CircularProgress className="loader" />}
    </>
  );
};
