export const state = () => ({
  lists: [],
  isLoading: true
})

export const mutations = {
  reInitialize(state) {
    state.lists = [];
  },
  setLists(state, lists) {
    state.lists = lists;
  },
  setLoading(state, loading) {
    state.isLoading = loading;
  }
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
    await this.$axios.$get("/api/chapters/10/progress");
  },
  async addList({commit, dispatch, state}, listName) {
    await this.$axios.$post("/api/question_lists/",{
      name: listName,
      visibility: "shared"
    });
    await dispatch('listsModuleInit');
  }
}
