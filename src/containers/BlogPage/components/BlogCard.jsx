import "../../../App.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateIcon from "@mui/icons-material/Create";


export const BlogCard = ({
  title,
  description,
  body,
  likePost,
  liked,
  deletePost,
  showEditModal,
  handleSelectPost,
  isAdmin,
}) => {
  const heartColor = liked ? "red" : "#c4c7c4";
  const background = liked ? "rgb(248 235 238)" : "white";
  const correctText = "#c4c7c4";

  const showEditForm = () => {
    handleSelectPost();
    showEditModal();
  };


  return (
    <div style={{ backgroundColor: background }} className="post">
      <div className="title">{title}</div>
      <hr />
      <p className="descr">{description}</p>
      <p>{body}</p>
      <button className="heartButton" onClick={likePost}>
        <FavoriteIcon style={{ fill: heartColor, fontSize: 25 }} />
      </button>
      {isAdmin && (
        <>
          <button className="correctText" onClick={showEditForm}>
            <CreateIcon style={{ fill: correctText, fontSize: 20 }} />
          </button>

          <button className="trashButton" onClick={deletePost}>
            <DeleteOutlineIcon style={{ fill: correctText, fontSize: 20 }} />
          </button>
        </>
      )}
    </div>
  );
};
