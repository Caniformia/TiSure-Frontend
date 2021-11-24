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
    if (state.questionIndex < _.size(state.chapterInfo.questions)) {
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
      state.selectedOptions = state.selectedOptions.filter(function(item) {
        return item !== optionIndex
      })
    } else {
      state.selectedOptions.push(optionIndex);
    }
  },
  setComments(state, comments) {
    state.comments = comments;
  }
}
