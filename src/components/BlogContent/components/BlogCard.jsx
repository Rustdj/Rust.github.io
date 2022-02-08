import { Component } from "react/cjs/react.development";
import "../../../App.css";

export class BlogCard extends Component {
  state = {
    likeCount: 0
  }


  toggleCount = () => {
    this.setState(({likeCount}) => {
      return{
        likeCount: likeCount + 1 
      }
    })
  }
    
  render() {
    return (
      <div className="post">
        <h2>{this.props.title}</h2>
        <p>{this.props.description}</p>
        <div>
          <button onClick={this.toggleCount}>Like</button>
          {this.state.likeCount}
        </div>
      </div>
    );
  };
  
  }