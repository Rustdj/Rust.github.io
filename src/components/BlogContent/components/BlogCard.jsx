import "../../../App.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const BlogCard = ({title, description, likePost, liked, deletePost}) => {
  
  const heartColor = liked ? 'red' : 'black'
    
  return (
    <div className="post">
      <h2>{title}</h2>
      <p>{description}</p>
      <div>
        <button onClick={likePost}>
          <FavoriteIcon style={{fill: heartColor}} />
        </button>
      </div>
      <button onClick={deletePost}>
        <DeleteOutlineIcon />
      </button>
    </div>
  );
  
  }