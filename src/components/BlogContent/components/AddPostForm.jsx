import "./AddPostForm.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export const AddPostForm = ({ addHideModal }) => {
  return (
    <>
      <form action="" className="addPostForm">
        <button onClick={addHideModal}>
          <HighlightOffIcon />
        </button>

        <h2>Create new post</h2>
        <div>
          <input type="text" name="postTitle" placeholder="title post" />
        </div>
        <div>
          <textarea name="postDescription" placeholder="description post" />
        </div>
        <div>
          <button onClick={addHideModal} className="buttons" type="button">
            Add new post
          </button>
        </div>
      </form>
      <div onClick={addHideModal} className="overlay"></div>
    </>
  );
};
