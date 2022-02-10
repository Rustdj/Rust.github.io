import "./BlogContent.css";
import { posts } from "../../shared/projectData";
import { BlogCard } from "./components/BlogCard";
import { Component } from "react/cjs/react.production.min";
import { AddPostForm } from "./components/AddPostForm";

export class BlogContent extends Component {
  state = {
    showBlog: true,
    showAddForm: false,
    blockArr: JSON.parse(localStorage.getItem("blogPosts")) || posts,
  };

  likePost = (pos) => {
    const temp = [...this.state.blockArr];
    temp[pos].liked = !temp[pos].liked;

    this.setState({
      blockArr: temp,
    });

    localStorage.setItem("blogPosts", JSON.stringify(temp));
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
      localStorage.setItem("blogPosts", JSON.stringify(temp));
    }
  };

  addNewBlogPost = (blogPost) => {

    this.setState((state) => {
      const posts = [...state.blockArr];
      posts.push(blogPost);
      localStorage.setItem("blogPosts", JSON.stringify(posts));
      return{
        blockArr: posts
      }
    })
    
  };

  


  handleEscape = (e) => {
    if (e.key === "Escape" && this.state.showAddForm) {
      this.addHideModal();
    }
  };

  componentDidMount() {
    window.addEventListener("keyup", this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleEscape);
  }

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

    this.addOpenModal = () => {
      this.setState({
        showAddForm: true,
      });
    };

    this.addHideModal = () => {
      this.setState({
        showAddForm: false,
      });
    };

    return (
      <>
        {this.state.showAddForm ? (
          <AddPostForm
            blockArr={this.state.blockArr}
            addHideModal={this.addHideModal}
            addNewBlogPost={this.addNewBlogPost}
          />
        ) : null}

        <button className="buttonTop" onClick={this.toggleBlock}>
          {this.state.showBlog ? "Hide Blog" : "Show Blog"}
        </button>
        {this.state.showBlog ? (
          <>
            <h1>Simple Blog</h1>
            <button onClick={this.addOpenModal} className="buttons">
              Create new post
            </button>
            <div className="posts">
              <div className="postWrapper">{blogPosts}</div>
            </div>
          </>
        ) : null}
      </>
    );
  }
}
