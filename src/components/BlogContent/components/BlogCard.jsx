import "../../../App.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const BlogCard = ({
  title,
  description,
  thumbnailUrl,
  likePost,
  liked,
  deletePost,
}) => {
  const heartColor = liked ? "red" : "#c4c7c4";
  const background = liked ? "rgb(248 235 238)" : "white";

  return (
    <div style={{ backgroundColor: background }} className="post">
      <img src={thumbnailUrl} alt="url" />
      <h2>{title}</h2>
      <p>{description}</p>
      <button className="heartButton" onClick={likePost}>
        <FavoriteIcon style={{ fill: heartColor }} />
      </button>
      <button className="trashButton" onClick={deletePost}>
        <DeleteOutlineIcon />
      </button>
    </div>
  );
};
