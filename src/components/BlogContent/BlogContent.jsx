import "./BlogContent.css";
import { posts } from "../../shared/projectData";
import { BlogCard } from "./components/BlogCard";

export const BlogContent = () => {
  const blogPosts = posts.map((item) => {
    return (
      <BlogCard
        key={item.id}
        title={item.title}
        description={item.description}
      />
    );
  });

  return (
    <>
      <h1>Simple Blog</h1>
      <div className="posts">
        <div className="post">{blogPosts}</div>
      </div>
    </>
  );
};
