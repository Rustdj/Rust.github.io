import "./EditPostForm.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useState } from "react";
import React from "react";

export default function EditPostForm({
  editClose,
  closeEditModal,
  selectedPost,
  editBlogPost,
}) {
  const [postTitle, setPostTitle] = useState(selectedPost.title);
  const [descr, setDescr] = useState(selectedPost.body);

  const handleFormTitleChange = (e) => {
    setPostTitle(e.target.value);
  };

  const handleFormDescrChange = (e) => {
    setDescr(e.target.value);
  };

  const savePost = (e) => {
    e.preventDefault();
    const post = {
      title: postTitle,
      description: descr,
      liked: false,
    };
    console.log(post);
    editBlogPost(post);
    closeEditModal();
  };

  return (
    <>
      <form action="" className="editPostForm" onSubmit={savePost}>
        <button onClick={editClose} className="btnClose">
          <HighlightOffIcon />
        </button>
        <h2>Post editing</h2>
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
          <button className="buttons" type="submit">
           Save
          </button>
        </div>
      </form>
      <div className="overlay"></div>
    </>
  );
}