import "./AddPostForm.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useState } from "react";
import React from "react";

export default function AddPostForm({
  onClose,
  listData,
  addNewBlogPost,
  closeModal,
  thumbnailUrl,
}) {
  const [postTitle, setPostTitle] = useState("");
  const [descr, setDescr] = useState("");

  const handleFormTitleChange = (e) => {
    setPostTitle(e.target.value);
  };

  const handleFormDescrChange = (e) => {
    setDescr(e.target.value);
  };

  const createPost = (e) => {
    e.preventDefault();
    const post = {
      id: listData.length + 1,
      title: postTitle,
      description: descr,
      src: thumbnailUrl,
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
          <HighlightOffIcon />
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
            value={descr}
            onChange={handleFormDescrChange}
            required
          />
        </div>
        <div>
          <button onClick={createPost} className="buttons" type="submit">
            Add new post
          </button>
        </div>
      </form>
      <div className="overlay"></div>
    </>
  );
}
