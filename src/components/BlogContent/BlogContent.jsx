import "./BlogContent.css";
import { BlogCard } from "./components/BlogCard";
import AddPostForm from "./components/AddPostForm";
import axios from "axios";
import { useEffect, useState } from "react";
import EditPostForm from "./components/EditPostForm";

export const BlogContent = () => {
  const [listData, setListData] = useState([]);
  const [form, setForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  

  const onClose = () => setForm(false);
  const editClose = () => setEditForm(false)

  // API async
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((response) => {
        console.log(response.data);
        setListData([...listData, ...response.data]);
      });
  }, []);


  // editBlogPost
  const editBlogPost = (updateBlogPost) => {
    axios.put(`https://jsonplaceholder.typicode.com/posts?_limit=10 ${updateBlogPost.id}`, updateBlogPost)
    .then((response) => {
      console.log("Correct posts =>", response.data);
      setListData([...listData, ...response.data]);
    });
  }

  // liked
  const likePost = (elem) => {
    const temp = [...listData];
    temp[elem].liked = !temp[elem].liked;

    setListData(temp);
  };

  // delete posts
  const deletePost = (elem) => {
    if (window.confirm(`Delete? ${listData[elem].title}`)) {
      const temp = [...listData];
      temp.splice(elem, 1);
      setListData(temp);
    }
  };

  // loading
  if (listData.length === 0) {
    <h1>LOADING...</h1>;
  }

  // addNewBlogPost
  const addNewBlogPost = (blogPost) => {
    const temp = [...listData];
    temp.push(blogPost);
    setListData(temp);
  };

  // editPost
  const handleSelectPost = (blogPost) => {
    setSelectedPost(blogPost)
  }

  // showModal
  const showModal = () => {
    setForm(true);
  }

  // closeModal
  const closeModal = () => {
    setForm(false);
  };

  // showEditModal
  const showEditModal = () => {
    setEditForm(true);
  }

  // closeEditModal
  const closeEditModal = () => {
    setEditForm(false);
  };

  
    
  console.log(selectedPost)
  return (
    <>
    {form}
      <div onClick={showModal} className="modal">
        <button>Add post</button>
      </div>
      {listData.map((item, elem) => {
        return (
          <BlogCard
            //key={item.id}
            liked={item.liked}
            thumbnailUrl={item.thumbnailUrl}
            title={item.title}
            body={item.body}
            description={item.description}
            likePost={() => likePost(elem)}
            deletePost={() => deletePost(elem)}
            showEditModal={showEditModal}
            handleSelectPost={() => handleSelectPost(item)}
          />
        );
      })}

      {
        editForm && (
          <EditPostForm
            editClose={editClose}
            closeEditModal={closeEditModal}
            addNewBlogPost={addNewBlogPost}
            selectedPost={selectedPost}
            editBlogPost={editBlogPost}
          />
        )
      }

      {form ? (
        <AddPostForm
          setForm={setForm}
          onClose={onClose}
          listData={listData}
          addNewBlogPost={addNewBlogPost}
          closeModal={closeModal}
        />
      ) : null}
    </>
  );
};

//export class BlogContent extends Component {

// state = {
//   showBlog: true,
//   showAddForm: false,
//   blockArr: [],
// };

// likePost = (pos) => {
//   const temp = [...this.state.blockArr];
//   temp[pos].liked = !temp[pos].liked;

//   this.setState({
//     blockArr: temp,
//   });

//   localStorage.setItem("blogPosts", JSON.stringify(temp));
// };

// toggleBlock = () => {
//   this.setState(({ showBlog }) => {
//     return {
//       showBlog: !showBlog,
//     };
//   });
// };

// deletePost = (pos) => {
//   if (window.confirm(`Delete?  ${this.state.blockArr[pos].title}`)) {
//     const temp = [...this.state.blockArr];
//     temp.splice(pos, 1);

//     this.setState({
//       blockArr: temp,
//     });
//     localStorage.setItem("blogPosts", JSON.stringify(temp));
//   }
// };

// addNewBlogPost = (blogPost) => {

//   this.setState((state) => {
//     const posts = [...state.blockArr];
//     posts.push(blogPost);
//     localStorage.setItem("blogPosts", JSON.stringify(posts));
//     return{
//       blockArr: posts
//     }
//   })

// };

// handleEscape = (e) => {
//   if (e.key === "Escape" && this.state.showAddForm) {
//     this.addHideModal();
//   }
// };

// componentDidMount() {
//   axios.get('https://jsonplaceholder.typicode.com/photos?_limit=10')
//   .then((response) => {
//     this.setState({
//       blockArr: response.data
//     })
//   })
//   .catch((err) => {
//     console.log(err)
//   })

//   window.addEventListener("keyup", this.handleEscape);
// }

// componentWillUnmount() {
//   window.removeEventListener("keyup", this.handleEscape);
// }

// render() {
//   const blogPosts = this.state.blockArr.map((item, pos) => {
//     return (
//       <BlogCard
//         key={item.id}
//         title={item.title}
//         description={item.description}
//         liked={item.liked}
//         likePost={() => this.likePost(pos)}
//         deletePost={() => this.deletePost(pos)}
//       />
//     );
//   });

//   this.addOpenModal = () => {
//     this.setState({
//       showAddForm: true,
//     });
//   };

//   this.addHideModal = () => {
//     this.setState({
//       showAddForm: false,
//     });
//   };

//   if(this.state.blockArr.length === 0)
//   return <h1>LOADING...</h1>

//   return (
//     <>
//       {this.state.showAddForm ? (
//         <AddPostForm
//           blockArr={this.state.blockArr}
//           addHideModal={this.addHideModal}
//           addNewBlogPost={this.addNewBlogPost}
//         />
//       ) : null}

//       <button className="buttonTop" onClick={this.toggleBlock}>
//         {this.state.showBlog ? "Hide Blog" : "Show Blog"}
//       </button>
//       {this.state.showBlog ? (
//         <>
//           <h1>Simple Blog</h1>
//           <button onClick={this.addOpenModal} className="buttonRight">
//             Create new post
//           </button>
//           <div className="posts">
//             <div className="postWrapper">{blogPosts}</div>
//           </div>
//         </>
//       ) : null}
//     </>
//   );
// }
//}
