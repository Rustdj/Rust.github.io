import "./BlogContent.css";
import { posts } from "../../shared/projectData";
import { BlogCard } from "./components/BlogCard";
import { Component } from "react/cjs/react.production.min";

export class BlogContent extends Component {
  state = {
    showBlog: true
  }

  blogPosts = posts.map((item, pos) => {
    return (
      <BlogCard
        key={item.id}
        title={item.title}
        description={item.description}
        pos={pos}
      />
    );
  });

  toggleBlock = () => {
    this.setState(({showBlog}) => {
      return {
        showBlog: !showBlog
      }
    })
  }
  

  render() {
    return (
      <>
        <button onClick={this.toggleBlock}>
        {
          this.state.showBlog ? 'Скрыть Blog' : 'Показать Blog'
        }
        </button>
        {
          this.state.showBlog ?
          <>
            <h1>Simple Blog</h1>
            <div className="posts">
              <div className="post">{this.blogPosts}</div>
            </div>
          </>
          : null
        }
          
          
      </>
    );
  }
}
