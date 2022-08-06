import {
  GET_POST_FEED_URL,
  ADD_LIKE_URL,
  REMOVE_LIKE_URL,
  getHeaders,
} from '../util/constants';
import axios from 'axios';

export const state = () => ({
  posts: [],
});

export const getters = {
  posts: (state) => state.posts,
};

export const actions = {
  /* FETCH POSTS FOR FEED */
  async posts({ commit, state }, token) {
    try {
      const { data: responseData } = await axios.get(`${GET_POST_FEED_URL}`, {
        ...getHeaders(token),
      });
      const { data, state, message } = responseData;
      if (state) {
        commit('setPosts', data);
      }
      return { data, state, message };
    } catch (error) {
      const { data: responseData } = error?.response;
      const { data, state, message } = responseData;
      return { data, state, message };
    }
  },
  /* LIKE FEED POST */
  async likePost({ commit }, { postUUID, token }) {
    try {
      const { data: responseData } = await axios.post(
        `${ADD_LIKE_URL}/${postUUID}`,
        {},
        {
          ...getHeaders(token),
        }
      );
      const { data, state, message } = responseData;
      if (state) {
        commit('updatePost', data);
      }
      return { data, state, message };
    } catch (error) {
      const { data: responseData } = error?.response;
      const { data, state, message } = responseData;
      return { data, state, message };
    }
  },
  /* UNLIKE FEED POST */
  async unlikePost({ commit }, { postUUID, token }) {
    try {
      const { data: responseData } = await axios.post(
        `${REMOVE_LIKE_URL}/${postUUID}`,
        {},
        {
          ...getHeaders(token),
        }
      );
      const { data, state, message } = responseData;
      if (state) {
        commit('updatePost', data);
      }
      return { data, state, message };
    } catch (error) {
      const { data: responseData } = error?.response;
      const { data, state, message } = responseData;
      return { data, state, message };
    }
  },
};

export const mutations = {
  setPosts(state, posts) {
    state.posts = posts;
  },
  updatePost(state, post) {
    const index = state.posts.findIndex((p) => p.uuid === post.uuid);
    if (index !== -1) {
      state.posts[index] = post;
    }
  },
};