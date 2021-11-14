export const state = () => ({
  questionIndex: 0
})

export const mutations = {
  incrementQuestionIndex(state) {
    state.questionId++;
  }
}
