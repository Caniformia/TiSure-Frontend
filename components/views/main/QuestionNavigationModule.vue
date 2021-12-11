<template>
<VStack>
  <ProgressBarQuestionChapter></ProgressBarQuestionChapter>
  <custom-progress-bar :percentage="questionPercentage"></custom-progress-bar>
</VStack>
</template>

<script>
import HStack from "~/components/utilities/layout/HStack";
import Spacer from "~/components/utilities/layout/Spacer";
import VStack from "~/components/utilities/layout/VStack";
import ProgressBarQuestionChapter from "~/components/views/main/navigation/ProgressBarQuestionChapter";
import CustomProgressBar from "~/components/utilities/CustomProgressBar";

export default {
  name: "QuestionNavigationModule",
  computed:{
    questionPercentage(){
      if (this.$store.state.questionModule.chapterInfo === null) {
        return 0;
      } else {
        return (this.$store.state.questionModule.questionIndex + 1) * 100.0 / (
          _.size(this.$store.state.questionModule.chapterInfo.question_ids)
        );
      }
    }
  },
  components: {CustomProgressBar, ProgressBarQuestionChapter, VStack, Spacer, HStack}
}
</script>

<style scoped>

</style>
