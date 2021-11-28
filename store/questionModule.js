import {viewStateEnum} from "@/extensions/types/viewStateEnum";

var _ = require("lodash");

export const state = () => ({
  currentSubjectID: 2,
  subjectInfo: null,
  chapterInfo: null,
  questionInfo: null,
  chapterIndex: 0,
  questionIndex: 0,
  isMemoryMode: false,
  viewState: viewStateEnum.NULL,
  selectedOptions: [],
  answeredQuestions: [],
  comments: [],
  rerenderQuestionModule: false
})

export const mutations = {
  setSubjectInfo(state, info) {
    state.subjectInfo = info;
  },
  setChapterInfo(state, info) {
    state.chapterInfo = info;
  },
  setQuestionInfo(state, info) {
    state.questionInfo = info;
  },
  setViewState(state, viewState) {
    state.viewState = viewState;
  },
  setRerenderQuestionModule(state, rerender) {
    state.rerenderQuestionModule = rerender;
  },
  incrementQuestionIndex(state) {
    if (state.questionIndex < _.size(state.chapterInfo.question_ids)) {
      state.questionIndex++;
      state.selectedOptions = [];
    }
  },
  switchMemoryMode(state) {
    if (state.isMemoryMode) {
      state.isMemoryMode = false;
      state.viewState = viewStateEnum.CHECKING;
    } else {
      state.isMemoryMode = true;
      state.viewState = viewStateEnum.SUMMARY;
    }
  },
  switchAnswerSelected(state, optionIndex) {
    if (_.includes(state.selectedOptions, optionIndex)) {
      state.selectedOptions = state.selectedOptions.filter(function (item) {
        return item !== optionIndex
      })
    } else {
      state.selectedOptions.push(optionIndex);
    }
  },
  setComments(state, comments) {
    state.comments = comments;
  },
  addComment(state, comment) {
    state.comments.unshift(comment);
  }
}

export const actions = {
  async submitComment({commit, state}, commentMessage) {
    await this.$axios.$post("/api/questions/" + state.questionInfo.id + "/comments",
      {
        question_id: state.questionInfo.id,
        content: commentMessage
      });
    await commit('addComment', {
      content: commentMessage,
      created_at: Date(),
      question_id: state.questionInfo.id
    })
  },
  async getSubjectByID({commit}, subjectID) {
    const subjectInfo = await this.$axios.$get("/api/subjects/" + subjectID);
    await commit('setSubjectInfo', subjectInfo);
  },
  async getChapterByID({commit}, chapterID) {
    const chapterInfo = await this.$axios.$get("/api/chapters/" + chapterID);
    await commit('setChapterInfo', chapterInfo);
  },
  async getQuestionByID({commit, state}, questionID) {
    const questionInfo = await this.$axios.$get("/api/questions/" + questionID);
    await commit('setRerenderQuestionModule', false);
    await commit('setQuestionInfo', questionInfo);
    await commit('setComments', questionInfo.comments);
    await commit('setRerenderQuestionModule', true);
    if (state.isMemoryMode) {
      commit('setViewState', viewStateEnum.SUMMARY);
    } else {
      commit('setViewState', viewStateEnum.CHECKING);
    }
  },
  async indexInit({commit, dispatch, state}) {
    await dispatch('getSubjectByID', state.currentSubjectID);
    await dispatch('getChapterByID', state.subjectInfo.chapters[state.chapterIndex].id)
    await commit('setViewState', viewStateEnum.READY)
    await dispatch('getQuestionByID', state.chapterInfo.question_ids[state.questionIndex])
  },
  async switchViewState({commit, dispatch, state}) {
    switch (state.viewState) {
      case viewStateEnum.NULL:
        await commit('setViewState', viewStateEnum.READY);
        break;
      case viewStateEnum.READY:
        await commit('setViewState', viewStateEnum.CHECKING);
        break;
      case viewStateEnum.CHECKING:
        await commit('setViewState', viewStateEnum.SUMMARY);
        break;
      case viewStateEnum.VERIFYING:
        await commit('setViewState', viewStateEnum.SUMMARY);
        break;
      case viewStateEnum.SUMMARY:
        await commit('setViewState', viewStateEnum.READY);
        let correctFlag = true;
        let choices = await _.cloneDeep(state.questionInfo.choices);
        let selected = state.selectedOptions;
        await _.forEach(choices, function (value) {
          if ((value.is_answer
              && !_.includes(selected, value.id))
            ||
            (!value.is_answer &&
              _.includes(selected, value.id))
          ) {
            correctFlag = false;
          }
        });
        await this.$axios.$post("/api/records",
          {
            question_id: state.questionInfo.id,
            is_correct: correctFlag,
            choice_ids: selected
          });
        await commit('incrementQuestionIndex');
        await console.log(state.chapterInfo.question_ids[state.questionIndex]);
        await dispatch('getQuestionByID', state.chapterInfo.question_ids[state.questionIndex]);
        break;
    }
  }
}
