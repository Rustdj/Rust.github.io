import "./AddPostForm.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Component } from "react/cjs/react.production.min";

export class AddPostForm extends Component {
  state = {
    postTitle: "",
    postDescr: "",
  };

  handlePostTitleChange = (e) => {
    this.setState({
      postTitle: e.target.value,
    });
  };

  handlePostDescrChange = (e) => {
    this.setState({
      postDescr: e.target.value,
    });
  };

  createPost = () => {
    const post = {
      id: this.props.blockArr + 1,
      title: this.state.postTitle,
      description: this.state.postDescr,
      liked: false,
    };
    
    this.props.addNewBlogPost(post)
    this.props.addHideModal();
  };

  render() {
    const addHideModal = this.props.addHideModal;
    return (
      <>
        <form action="" className="addPostForm">
          <button onClick={addHideModal}>
            <HighlightOffIcon />
          </button>

          <h2>Create new post</h2>
          <div>
            <input
              type="text"
              name="postTitle"
              placeholder="title post"
              value={this.state.postTitle}
              onChange={this.handlePostTitleChange}
            />
          </div>
          <div>
            <textarea
              name="postDescription"
              placeholder="description post"
              value={this.state.postDescr}
              onChange={this.handlePostDescrChange}
            />
          </div>
          <div>
            <button onClick={this.createPost} className="buttons" type="button">
              Add new post
            </button>
          </div>
        </form>
        <div onClick={addHideModal} className="overlay"></div>
      </>
    );
  }
}
