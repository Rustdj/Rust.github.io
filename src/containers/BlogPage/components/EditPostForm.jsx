import "./EditPostForm.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useState, useEffect } from "react";
import React from "react";

export default function EditPostForm(props) {
  const [postTitle, setPostTitle] = useState(props.selectedPost.title);
  const [postDescr, setDescr] = useState(props.selectedPost.description);

  const handleFormTitleChange = (e) => {
    setPostTitle(e.target.value);
  };

  const handleFormDescrChange = (e) => {
    setDescr(e.target.value);
  };

  const savePost = (e) => {
    e.preventDefault();
    const post = {
      id: props.selectedPost.id,
      title: postTitle,
      description: postDescr,
      liked: props.selectedPost.liked,
    };
    console.log(post);
    props.editBlogPost(post);
    props.closeEditModal();
    
  };

  

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        props.closeEditModal();
      }
    };
    window.addEventListener('keyup', handleEscape)

    return () => window.removeEventListener('keyup', handleEscape)
  }, [props])



  return (
    <>
      <form action="" className="editPostForm" onSubmit={savePost}>
        <button onClick={props.editClose} className="editClose">
          <HighlightOffIcon style={{fontSize: 30, color: 'grey'}}/>
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
