import "./BlogContent.css";
import { posts } from "../../shared/projectData";
import { BlogCard } from "./components/BlogCard";
import { Component } from "react/cjs/react.production.min";

export class BlogContent extends Component {
  state = {
    showBlog: true,
    blockArr: posts
    
    // blockArr: JSON.parse(localStorage.getItem('blogPosts')) || posts
  };

  likePost = (pos) => {
    const temp = [...this.state.blockArr];
    temp[pos].liked = !temp[pos].liked;

    this.setState({
      blockArr: temp,
    });

    // localStorage.setItem('blogPosts', JSON.stringify(temp))
  };

  toggleBlock = () => {
    this.setState(({ showBlog }) => {
      return {
        showBlog: !showBlog,
      };
    });
  };

  deletePost = (pos) => {
    if (window.confirm(`Удалить?  ${this.state.blockArr[pos].title}`)) {
      const temp = [...this.state.blockArr];
      temp.splice(pos, 1);

      this.setState({
        blockArr: temp,
      });
    }
    // localStorage.setItem('blockArr', JSON.stringify(pos))
  };

  render() {
    const blogPosts = this.state.blockArr.map((item, pos) => {
      return (
        <BlogCard
          key={item.id}
          title={item.title}
          description={item.description}
          liked={item.liked}
          likePost={() => this.likePost(pos)}
          deletePost={() => this.deletePost(pos)}
        />
      );
    });
    return (
      <>
        <button onClick={this.toggleBlock}>
          {this.state.showBlog ? "Скрыть Blog" : "Показать Blog"}
        </button>
        {this.state.showBlog ? (
          <>
            <h1>Simple Blog</h1>
            <div className="posts">
              <div className="post">{blogPosts}</div>
            </div>
          </>
        ) : null}
      </>
    );
  }
}
