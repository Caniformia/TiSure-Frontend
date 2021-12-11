import {viewSelectorEnum} from "@/extensions/types/viewSelectorEnum";
import {viewStateEnum} from "@/extensions/types/viewStateEnum";

export const state = () => ({
  viewSelector: viewSelectorEnum.QUESTION,
  subjectsInfo: []
})

export const mutations = {
  switchToSettings(state) {
    if (state.viewSelector === viewSelectorEnum.SETTINGS) {
      state.viewSelector = viewSelectorEnum.QUESTION;
    } else {
      state.viewSelector = viewSelectorEnum.SETTINGS;
    }
  },
  setSubjectsInfo(state, infos) {
    state.subjectsInfo = infos;
  }
}

export const actions = {
  async indexInit({commit, dispatch, state}) {
    const subjectsInfo = await this.$axios.$get("/api/subjects/");
    await commit('setSubjectsInfo',subjectsInfo);
  },
  async switchSubject({commit, dispatch, state}, newSubjectID) {
    if (state["questionModule/currentSubjectID"] !== newSubjectID) {
      await commit('questionModule/setSubjectID',newSubjectID);
      await commit('switchToSettings');
      await commit('questionModule/setRerenderQuestionModule', false);
      await dispatch('questionModule/questionModuleInit');
      await commit('questionModule/setRerenderQuestionModule', true);
    }
  }
}
