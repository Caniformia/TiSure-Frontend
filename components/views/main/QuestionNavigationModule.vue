<template>
<VStack>
  <ProgressBarQuestionChapter></ProgressBarQuestionChapter>
  <custom-progress-bar :percentage="30"></custom-progress-bar>
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
  components: {CustomProgressBar, ProgressBarQuestionChapter, VStack, Spacer, HStack}
}
</script>

<style scoped>

</style>
