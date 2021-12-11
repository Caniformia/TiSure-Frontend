<template>
  <v-stack>
    <h-stack class="items-end mb-4">
      <p class="chinese-font text-4xl">正确率</p>
      <spacer/>
      <p class="bold-font text-lg mr-4"> {{ correctness.toFixed(1) }}% </p>
    </h-stack>
    <v-stack class="mb-2">
      <custom-progress-bar :percentage="correctness"></custom-progress-bar>
    </v-stack>
    <p class="chinese-font">{{ correctnessComment }}</p>
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
        return "或许稍微多看看比较好喔！"
      } else if (this.correctness >= 40) {
        return "将近二分之一的概率，究极二择！"
      } else if (this.correctness >= 25) {
        return "努把力的话一定可以记住！"
      } else if (this.correctness >= 10) {
        return "啊这种就很讨厌了（摔）！"
      } else {
        return "攀登名为航概之神的巅峰！"
      }
    }
  }

}
</script>

<style scoped>

</style>
