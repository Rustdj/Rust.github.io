import axios from 'axios';
import {
    useMutation,
    useQuery
} from 'react-query';
import {
    postsUrl
} from './projectData';

export const useGetPosts = () => {
    return useQuery('posts', () => {
        return axios.get(postsUrl)
            .then(res => res.data)
            .catch(err => {
                throw new Error(err)
            })
    }, {
        refetchOnWindowFocus: false,
        //staleTime:
    })
}

export const useLikePost = () => {
    return useMutation(
        (updatePost) => {
            return axios.put(`${postsUrl}${updatePost.id}`, updatePost)
                .then(res => res.data)
                .catch(err => {
                    throw new Error(err)
                })
        }
    )
}

export const useDeletePost = () => {
    return useMutation(
        (blogPost) => {
            return axios.delete(`${postsUrl}${blogPost.id}`)
                .then(res => res.data)
                .catch(err => {
                    throw new Error(err)
                })
        }
    )
}

export const useAddPost = () => {
    return useMutation(
        (blogPost) => {
            return axios.post(postsUrl, blogPost)
                .then(res => res.data)
                .catch(err => {
                    throw new Error(err)
                })
        }
    )
}

export const useEditPost = () => {
    return useMutation(
        (updateBlogPost) => {
            return axios.put(`${postsUrl}${updateBlogPost.id}`, updateBlogPost)
                .then(res => res.data)
                .catch(err => {
                    throw new Error(err)
                })
        }
    )
}



//=========

export const useGetSinglePosts = (postId) => {
    return useQuery(['posts', postId], () => {
        return axios.get(postsUrl + postId)
            .then(res => res.data)
            .catch(err => {
                throw new Error(err)
            })
    }, {
        refetchOnWindowFocus: false,
        //staleTime:
    })
}