<template>
  <h-stack>
<!--    <button class="hover:opacity-75">-->
      <h-stack>
        <div class="chinese-font pr-1 opacity-60">{{ this.chapterName.mainTitle }}</div>
        <div class="chinese-font">{{ this.chapterName.subTitle }}</div>
      </h-stack>
<!--    </button>-->
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
        let numberToKanji = ["零","一","二","三","四","五","六","七","八","九"]
        return {
          mainTitle: "第" + numberToKanji[this.$store.state.questionModule.chapterIndex + 1] + "章",
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
          total: _.size(this.$store.state.questionModule.chapterInfo.question_ids)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
