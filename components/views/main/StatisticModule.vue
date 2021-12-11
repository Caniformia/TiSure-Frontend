<template>
  <v-stack>
    <h-stack class="items-end mb-4">
      <p class="chinese-font text-4xl">大家的正确率</p>
      <spacer/>
      <p v-if="correctness>=-0.5" class="bold-font text-lg mr-4"> {{ correctness.toFixed(1) }}% </p>
      <p v-if="correctness<-0.5" class="chinese-font text-lg mr-4"> 数据不足 </p>
    </h-stack>
    <v-stack class="mb-2">
      <custom-progress-bar :percentage="correctness"></custom-progress-bar>
    </v-stack>
    <p class="chinese-font">{{ correctnessComment }}</p>
    <p v-if="personalRecordCount>0" class="chinese-font">在遇见它的 {{ personalRecordCount }} 次里，你一共做对
      {{ personalCorrectCount }} 次，正确率为 {{ personalCorrectness.toFixed(1) }} %。{{ personalCorrectnessComment }}</p>
  </v-stack>
</template>

<script>
import VStack from "@/components/utilities/layout/VStack";
import HStack from "@/components/utilities/layout/HStack";
import Spacer from "@/components/utilities/layout/Spacer";
import Divider from "@/components/utilities/Divider";
import CustomProgressBar from "@/components/utilities/CustomProgressBar";

var _ = require("lodash");

export default {
  name: "StatisticModule",
  components: {CustomProgressBar, Divider, Spacer, HStack, VStack},
  computed: {
    personalRecordCount() {
      if (this.$store.state.questionModule.questionStatistic.currentUser !== null) {
        return this.$store.state.questionModule.questionStatistic.current_user.record_count;
      } else {
        return 0;
      }
    },
    personalCorrectCount() {
      if (this.$store.state.questionModule.questionStatistic.currentUser !== null) {
        return this.$store.state.questionModule.questionStatistic.current_user.correct_count;
      } else {
        return 0;
      }
    },
    personalCorrectness() {
      if (this.$store.state.questionModule.questionStatistic !== null) {
        if (this.personalRecordCount !== 0) {
          return this.personalCorrectCount * 100.0
            / (this.personalRecordCount * 1.0);
        }
      }
      return -1;
    },
    correctness() {
      if (this.$store.state.questionModule.questionStatistic !== null) {
        if (this.$store.state.questionModule.questionStatistic.all_users.record_count !== 0) {
          return this.$store.state.questionModule.questionStatistic.all_users.correct_count * 100.0
            / (this.$store.state.questionModule.questionStatistic.all_users.record_count * 1.0);
        }
      }
      return -1;
    },
    correctnessComment() {
      if (this.correctness >= 90) {
        return "是喜闻乐见的常识题！";
      } else if (this.correctness >= 75) {
        return "大概率能轻松做对！"
      } else if (this.correctness >= 60) {
        return "或许稍微多看看会比较好喔！"
      } else if (this.correctness >= 40) {
        return "将近二分之一的概率，究极二择！"
      } else if (this.correctness >= 25) {
        return "努把力的话一定可以记住！"
      } else if (this.correctness >= 10) {
        return "啊这种就很讨厌了（摔）！"
      } else if (this.correctness >= -0.5) {
        return "攀登名为航概之神的巅峰！"
      } else {
        return "是第一个踏足这里的人喔！"
      }
    },
    personalCorrectnessComment() {
      if (this.personalCorrectness >= 80) {
        return "易如反掌啦~（摊手）";
      } else if (this.personalCorrectness >= 50) {
        return "问题不大！"
      } else if (this.personalCorrectness >= 20) {
        return "是比较需要注意的题目！"
      } else {
        return "考试遇到的话真的会哭出来的！请多给它一些时间！"
      }
    }
  }

}
</script>

<style scoped>

</style>
