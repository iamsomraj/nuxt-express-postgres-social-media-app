import { getHeaders, GET_USER_PROFILE_URL } from '../util';
import axios from 'axios';

export const state = () => ({
  profile: null,
});

export const getters = {
  profile: (state) => state.profile,
};

export const actions = {
  /* GET USER PROFILE */
  async getUserProfile({ commit }, { uuid, token }) {
    try {
      const { data: responseData } = await axios.get(
        `${GET_USER_PROFILE_URL}/${uuid}`,
        {
          ...getHeaders(token),
        }
      );
      const { data, state, message } = responseData;
      if (state) {
        commit('setProfile', data);
      } else {
        commit('setProfile', null);
      }
      return { data, state, message };
    } catch (error) {
      const { data: responseData } = error?.response;
      const { data, state, message } = responseData;
      commit('setProfile', null);
      return { data, state, message };
    }
  },
};

export const mutations = {
  setProfile(state, profile) {
    state.profile = profile;
  },
};
