<template>
  <h-stack>
    <button class="hover:opacity-75">
      <h-stack>
        <div class="chinese-font pr-1 opacity-60">{{ this.chapterName.mainTitle }}</div>
        <div class="chinese-font">{{ this.chapterName.subTitle }}</div>
      </h-stack>
    </button>
    <spacer></spacer>
    <div class="chinese-font pr-1 opacity-80">{{ questionNumber.nowAt }}</div>
    <div class="chinese-font pr-1">/</div>
    <div class="chinese-font">{{ questionNumber.total }}</div>
  </h-stack>
</template>

<script>
import HStack from "~/components/utilities/layout/HStack";
import Spacer from "~/components/utilities/layout/Spacer";

var _ = require("lodash")

export default {
  name: "ProgressBarQuestionChapter",
  components: {Spacer, HStack},
  computed: {
    chapterName() {
      if (this.$store.state.questionModule.chapterInfo === null) {
        return {
          mainTitle: "",
          subTitle: ""
        };
      } else {
        return {
          mainTitle: this.$store.state.questionModule.chapterInfo.name,
          subTitle: this.$store.state.questionModule.chapterInfo.name
        }
      }
    },
    questionNumber() {
      if (this.$store.state.questionModule.chapterInfo === null) {
        return {
          nowAt: 0,
          total: -1
        };
      } else {
        return {
          nowAt: this.$store.state.questionModule.questionIndex + 1,
          total: _.size(this.$store.state.questionModule.chapterInfo.questions)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
