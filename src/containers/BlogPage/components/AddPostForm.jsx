import "./AddPostForm.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useState } from "react";
import React from "react";

export default function AddPostForm({
  onClose,
  addNewBlogPost,
  closeModal,
}) {
  const [postTitle, setPostTitle] = useState("");
  const [postDescr, setDescr] = useState("");

  const handleFormTitleChange = (e) => {
    setPostTitle(e.target.value);
  };

  const handleFormDescrChange = (e) => {
    setDescr(e.target.value);
  };

  const createPost = (e) => {
    e.preventDefault();
    const post = {
      title: postTitle,
      description: postDescr,
      liked: false,
    };
    console.log(post);
    addNewBlogPost(post);
    closeModal();
  };

  return (
    <>
      <form action="" className="addPostForm">
        <button onClick={onClose} className="btnClose">
          <HighlightOffIcon style={{fontSize: 30, color: 'grey'}}/>
        </button>
        <h2>Create post</h2>
        <div className="input">
          <input
            type="text"
            name="postTitle"
            placeholder="title post"
            value={postTitle}
            onChange={handleFormTitleChange}
            required
          />
        </div>
        <div className="textarea">
          <textarea
            name="postDescription"
            placeholder="description post"
            value={postDescr}
            onChange={handleFormDescrChange}
            required
          />
        </div>
        <div>
          <button onClick={createPost} className="buttons" type="submit">
            Add
          </button>
        </div>
      </form>
      <div className="overlay"></div>
    </>
  );
}
