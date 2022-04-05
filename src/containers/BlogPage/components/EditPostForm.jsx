import "./EditPostForm.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useState } from "react";
import React from "react";

export default function EditPostForm({
  editClose,
  selectedPost,
  editBlogPost,
  closeEditModal,
  
}) {
  const [postTitle, setPostTitle] = useState(selectedPost.title);
  const [postDescr, setDescr] = useState(selectedPost.description);

  const handleFormTitleChange = (e) => {
    setPostTitle(e.target.value);
  };

  const handleFormDescrChange = (e) => {
    setDescr(e.target.value);
  };

  const savePost = (e) => {
    e.preventDefault();
    const post = {
      id: selectedPost.id,
      title: postTitle,
      description: postDescr,
      liked: selectedPost.liked,
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
            value={postDescr}
            onChange={handleFormDescrChange}
            required
            rows={8}
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
