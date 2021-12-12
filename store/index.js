import {viewSelectorEnum} from "@/extensions/types/viewSelectorEnum";
import {viewStateEnum} from "@/extensions/types/viewStateEnum";
import _ from "lodash";
import {list} from "postcss";

export const state = () => ({
  viewSelector: viewSelectorEnum.QUESTION,
  subjectsInfo: [],
  userInfo: null,
  isInListMode: false,
  listInfo: null
})

export const mutations = {
  setIsInListMode(state, flag) {
    state.isInListMode = flag;
  },
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
  setUserInfo(state, info) {
    state.userInfo = info;
  },
  setListInfo(state, info) {
    state.listInfo = info;
  },
  reInitialize(state) {
    state.viewSelector = viewSelectorEnum.QUESTION;
    state.subjectsInfo = [];
    state.userInfo = null;
    state.isInListMode = false;
    state.listInfo = null;
  }
}

export const actions = {
  async emptyToInit({commit, dispatch, state}) {
    await commit('reInitialize');
    await dispatch('listsModule/emptyToInit');
    await dispatch('questionModule/emptyToInit');
  },
  async indexInit({commit, dispatch, state}) {
    const subjectsInfo = await this.$axios.$get("/api/subjects/");
    await commit('setSubjectsInfo', subjectsInfo);
    const userInfo = await this.$axios.$get("/api/user");
    await commit('setUserInfo', userInfo);
    if (userInfo.last_accessed_subject != null) {
      await commit('questionModule/setSubjectID', userInfo.last_accessed_subject.id)
    }
  },
  async switchSubject({commit, dispatch, state}, newSubjectID) {
    if (state["questionModule/currentSubjectID"] !== newSubjectID) {
      await commit('setIsInListMode', false);
      await commit('questionModule/setSubjectID', newSubjectID);
      await commit('questionModule/setRerenderQuestionModule', false);
      await commit('switchToSettings');
      await dispatch('questionModule/questionModuleInit');
      await commit('questionModule/setRerenderQuestionModule', true);
      await this.$axios.$patch("/api/auth", {
        last_accessed_subject_id: newSubjectID
      })
    }
  },
  async switchChapter({commit, dispatch, state}, newChapterIndex) {
    if (state["questionModule/chapterIndex"] !== newChapterIndex) {
      await commit('setIsInListMode', false);
      await commit('questionModule/setChapterIndex', newChapterIndex);
      await commit('questionModule/setRerenderQuestionModule', false);
      await commit('switchToSettings');
      await dispatch('questionModule/chapterRefresh');
      await commit('questionModule/setRerenderQuestionModule', true);
    }
  },
  async addQuestionToList({commit, dispatch, state}, listID) {
    if (state.questionModule.questionIndex !== 99999) {
      await this.$axios.$post("/api/question_list_items/", {
        question_id: state.questionModule.questionInfo.id,
        question_list_id: listID
      });
      await dispatch('listsModule/listsModuleInit');
      await dispatch('questionModule/getQuestionByID', state.questionModule.questionInfo.id);
    }
  },
  async removeQuestionFromList({commit, dispatch, state}, listID) {
    if (state.questionModule.questionIndex !== 99999) {
      let listInfo = await this.$axios.$get("/api/question_lists/" + listID);
      let toRemove = await _.reverse(listInfo.question_list_items)[state.questionModule.questionIndex];
      await this.$axios.$delete("/api/question_list_items/" + toRemove.id)
      await dispatch('listsModule/listsModuleInit');
      await dispatch('questionModule/getQuestionByID', state.questionModule.questionInfo.id);
      if (state.isInListMode && (listID === state.listInfo.id)) {
        const listInfo = await this.$axios.$get("/api/question_lists/" + listID);
        await commit('setListInfo', listInfo);
        await commit('questionModule/setChapterInfo', {
          id: -1,
          name: listInfo.name,
          question_ids: _.reverse(listInfo.question_list_items.map(question_list_item => question_list_item.question_id))
        });
        await commit('questionModule/setRerenderQuestionModule', false);
        if (_.size(state.questionModule.chapterInfo.question_ids) === 0) {
          await commit('questionModule/setQuestionIndex', 99999);
        } else if (state.questionModule.questionIndex >= _.size(state.questionModule.chapterInfo.question_ids)) {
          await commit('questionModule/decrementQuestionIndex');
          await dispatch('questionModule/getQuestionByID', state.questionModule.chapterInfo.question_ids[state.questionModule.questionIndex]);
        } else {
          await dispatch('questionModule/getQuestionByID', state.questionModule.chapterInfo.question_ids[state.questionModule.questionIndex]);
        }
        await commit('questionModule/setRerenderQuestionModule', true);
      }
    }
  },
  async jumpQuestion({commit, dispatch, state}, targetQuestionIndex) {
    if ((targetQuestionIndex < _.size(state.questionModule.chapterInfo.question_ids)) && (targetQuestionIndex >= 0)) {
      await commit('questionModule/setRerenderQuestionModule', false)
      await commit('questionModule/setViewState', viewStateEnum.READY);
      await commit('questionModule/setQuestionIndex', targetQuestionIndex);
      await commit('switchToSettings');
      await commit('questionModule/setRerenderQuestionModule', false);
      await dispatch('questionModule/getQuestionByID', state.questionModule.chapterInfo.question_ids[state.questionModule.questionIndex]);
      await commit('questionModule/setRerenderQuestionModule', true);
    }
  },
  async getInListMode({commit, dispatch, state}, targetListIndex) {
    const listInfo = await this.$axios.$get("/api/question_lists/" + targetListIndex);
    if (listInfo.question_count > 0) {
      await commit('setListInfo', listInfo);
      await commit('setIsInListMode', true);
      await commit('questionModule/setRerenderQuestionModule', false);
      await commit('switchToLists');
      await commit('questionModule/setSubjectID', -1);
      await commit('questionModule/setChapterIndex', -1);
      await commit('questionModule/setChapterInfo', {
        id: -1,
        name: listInfo.name,
        question_ids: _.reverse(listInfo.question_list_items.map(question_list_item => question_list_item.question_id))
      });

      await commit('questionModule/setQuestionIndex', 0);
      await commit('questionModule/setSelectedOptions', []);
      await dispatch('questionModule/getQuestionByID', state.questionModule.chapterInfo.question_ids[state.questionModule.questionIndex])

      await commit('questionModule/setRerenderQuestionModule', true);
    }
  },
  async shareList({commit, dispatch, state}, listID) {
    const listInfo = await this.$axios.$get("/api/question_lists/" + listID);
    await commit('setListInfo', listInfo);
    await commit('listsModule/setShowShare', true);
  }
}
