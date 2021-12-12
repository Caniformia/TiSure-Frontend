export const state = () => ({
  lists: [],
  isLoading: true,
  showShare: false
})

export const mutations = {
  reInitialize(state) {
    state.lists = [];
    state.isLoading = true;
    state.showShare = false;
  },
  setLists(state, lists) {
    state.lists = lists;
  },
  setLoading(state, loading) {
    state.isLoading = loading;
  },
  setShowShare(state, flag) {
    state.showShare = flag;
  },

}

export const actions = {
  async emptyToInit({commit, dispatch, state}) {
    await commit('reInitialize');
  },
  async listsModuleInit({commit, dispatch, state}) {
    await commit('setLoading', true);
    const lists = await this.$axios.$get("/api/question_lists/");
    await commit('setLists', lists);
    await commit('setLoading', false);
  },
  async addList({commit, dispatch, state}, listName) {
    await this.$axios.$post("/api/question_lists/",{
      name: listName,
      visibility: "shared"
    });
    await dispatch('listsModuleInit');
  }
}
