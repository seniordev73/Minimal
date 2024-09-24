import { useCallback, useState } from 'react';
// utils
import axios, { API_ENDPOINTS } from 'src/utils/axios';
// types
import { IPostItem } from 'src/types/blog';
import { IErrorType } from 'src/types/error';

// ----------------------------------------------------------------------

type StatusProps = {
  loading: boolean;
  empty?: boolean;
  error: IErrorType;
};

export default function useBlog() {
  const [posts, setPosts] = useState<IPostItem[]>([]);

  const [post, setPost] = useState<IPostItem | null>(null);

  const [latestPosts, setLatestPosts] = useState<IPostItem[]>([]);

  const [postsStatus, setPostsStatus] = useState<StatusProps>({
    loading: false,
    empty: false,
    error: null,
  });

  const [postStatus, setPostStatus] = useState<StatusProps>({
    loading: false,
    error: null,
  });

  const handleSetPostsStatus = useCallback((name: string, value: boolean | null) => {
    setPostsStatus((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSetPostStatus = useCallback((name: string, value: boolean | null) => {
    setPostStatus((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const getPosts = useCallback(async () => {
    handleSetPostsStatus('loading', true);
    handleSetPostsStatus('empty', false);
    handleSetPostsStatus('error', null);
    try {
      const response = await axios.get(API_ENDPOINTS.post.list);
      setPosts(response.data.posts);
      handleSetPostsStatus('loading', false);
      handleSetPostsStatus('empty', !response.data.posts.length);
      handleSetPostsStatus('error', null);
    } catch (error) {
      console.error(error);
      handleSetPostsStatus('loading', false);
      handleSetPostsStatus('empty', false);
      handleSetPostsStatus('error', error);
    }
  }, [handleSetPostsStatus]);

  const getPost = useCallback(
    async (title: string) => {
      handleSetPostStatus('loading', true);
      handleSetPostStatus('error', null);
      try {
        const response = await axios.get(API_ENDPOINTS.post.details, {
          params: {
            title,
          },
        });
        setPost(response.data.post);
        handleSetPostStatus('loading', false);
        handleSetPostStatus('error', null);
      } catch (error) {
        console.error(error);
        handleSetPostStatus('loading', false);
        handleSetPostStatus('error', error);
      }
    },
    [handleSetPostStatus]
  );

  const getLatestPosts = useCallback(async (title: string) => {
    try {
      const response = await axios.get(API_ENDPOINTS.post.latest, {
        params: {
          title,
        },
      });
      setLatestPosts(response.data.posts);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return {
    post,
    posts,
    latestPosts,
    //
    postsStatus,
    postStatus,
    //
    getPost,
    getPosts,
    getLatestPosts,
  };
}
