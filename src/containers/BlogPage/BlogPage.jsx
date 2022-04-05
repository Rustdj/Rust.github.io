import "./BlogPage.css";
import { BlogCard } from "./components/BlogCard";
import AddPostForm from "./components/AddPostForm";
import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import EditPostForm from "./components/EditPostForm";
import CircularProgress from "@mui/material/CircularProgress";
import { postsUrl } from "../../shared/projectData";

export const BlogContent = () => {
  const [listData, setListData] = useState([]);
  const [form, setForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [pending, setPending] = useState(false);

  const onClose = () => setForm(false);
  const editClose = () => setEditForm(false);

  // API async
  let source;
  const fetchPosts = () => {
    source = axios.CancelToken.source();
    axios
      .get(postsUrl)
      .then((response) => {
        console.log("Getting posts =>", response.data);
        setListData([...listData, ...response.data]);
    });
  };

  useEffect(() => {
    if (source) {
      source.cancel()
    }
    fetchPosts()
  }, [])

  // addNewBlogPost
  const addNewBlogPost = (blogPost) => {
    setPending(true);
    axios
      .post(postsUrl, blogPost)
      .then((response) => {
        console.log("Mounted post =>", response.data);
        fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //editBlogPost
  const editBlogPost = (updateBlogPost) => {
    axios
      .put(`${postsUrl}${updateBlogPost.id}`, updateBlogPost)
      .then((response) => {
        console.log("Correct post =>", response.data);
        fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // delete posts
  const deletePost = (blogPost) => {
    if (window.confirm(`Удалить ${blogPost.title}?`)) {
      setPending(true);
      axios
        .delete(`${postsUrl}${blogPost.id}`, blogPost)
        .then((response) => {
          console.log("Deleted post =>", response.data);
          fetchPosts();
          setPending(pending);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // liked
  const likePost = (blogPost) => {
    const temp = [...listData];
    temp[blogPost].liked = !temp[blogPost].liked;
    setListData(temp);
    axios
      .put(`${postsUrl}${blogPost.id}`, temp)
      .then((response) => {
        console.log("Liked post =>", response.data);
        //fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // loading
  if (listData.length === 0) <h1>LOADING...</h1>;

  // editPost
  const handleSelectPost = (blogPost) => {
    setSelectedPost(blogPost);
  };

  // showModal
  const showModal = () => {
    setForm(true);
  };

  // closeModal
  const closeModal = () => {
    setForm(false);
  };

  // showEditModal
  const showEditModal = () => {
    setEditForm(true);
  };

  // closeEditModal
  const closeEditModal = () => {
    setEditForm(false);
  };

  //console.log(selectedPost);
  return (
    <>
      {pending && <CircularProgress color="inherit" />}
      {form}
      <div onClick={showModal} className="modal">
        <button>Add post</button>
      </div>
      {listData.map((item, elem) => {
        return (
          <BlogCard
            key={elem}
            liked={item.liked}
            thumbnailUrl={item.thumbnailUrl}
            title={item.title}
            body={item.body}
            description={item.description}
            showEditModal={showEditModal}
            likePost={() => likePost(elem)}
            deletePost={() => deletePost(item)}
            handleSelectPost={() => handleSelectPost(item)}
          />
        );
      })}

      {editForm && (
        <EditPostForm
          editClose={editClose}
          closeEditModal={closeEditModal}
          addNewBlogPost={addNewBlogPost}
          selectedPost={selectedPost}
          editBlogPost={editBlogPost}
        />
      )}

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
