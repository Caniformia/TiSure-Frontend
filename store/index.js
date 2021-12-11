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
  switchToLists(state) {
    if (state.viewSelector === viewSelectorEnum.LISTS) {
      state.viewSelector = viewSelectorEnum.QUESTION;
    } else {
      state.viewSelector = viewSelectorEnum.LISTS;
    }
  },
  setViewSelector(state, selectedView) {
    state.viewSelector = selectedView;
  },
  setSubjectsInfo(state, infos) {
    state.subjectsInfo = infos;
  },
  reInitialize(state) {
    state.viewSelector = viewSelectorEnum.QUESTION;
    state.subjectsInfo = [];
  }
}

export const actions = {
  async emptyToInit({commit, dispatch, state}) {
    await commit('reInitialize');
    await dispatch('questionModule/emptyToInit');
  },
  async indexInit({commit, dispatch, state}) {
    const subjectsInfo = await this.$axios.$get("/api/subjects/");
    await commit('setSubjectsInfo', subjectsInfo);
  },
  async switchSubject({commit, dispatch, state}, newSubjectID) {
    if (state["questionModule/currentSubjectID"] !== newSubjectID) {
      await commit('questionModule/setSubjectID',newSubjectID);
      await commit('questionModule/setRerenderQuestionModule', false);
      await commit('switchToSettings');
      await dispatch('questionModule/questionModuleInit');
      await commit('questionModule/setRerenderQuestionModule', true);
    }
  },
  async switchChapter({commit, dispatch, state}, newChapterIndex) {
    if (state["questionModule/chapterIndex"] !== newChapterIndex) {
      await commit('questionModule/setChapterIndex',newChapterIndex);
      await commit('questionModule/setRerenderQuestionModule', false);
      await commit('switchToSettings');
      await dispatch('questionModule/chapterRefresh');
      await commit('questionModule/setRerenderQuestionModule', true);
    }
  }
}
