export const BlogCard = (props) => {
    
  return (
    <div className="post">
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </div>
  );
};
