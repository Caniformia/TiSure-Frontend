<template>
  <v-stack class="mb-4">
    <h-stack class="my-2">
      <p class="chinese-font text-2xl">跳转题目</p>
      <spacer/>
      <p v-if="!isFinished" class="bold-font text-lg mr-2"> {{ getQuestionIndex }} / {{ getQuestionsCount }}</p>
      <p v-if="isFinished" class="bold-font text-lg mr-2"> Finished. / {{ getQuestionsCount }}</p>
    </h-stack>
    <div class="relative">
      <input v-model="targetQuestionIndex" class="border border-black text-gray-900 rounded-full block w-full p-4">
      <div class="absolute top-4 right-4">
        <button @click="jumpQuestion" class="bg-black border-black border rounded-full hover:border-gray-700">
          <ph-arrow-right weight="bold" class="text-white text-lg m-1 hover:opacity-75"/>
        </button>
      </div>
    </div>
  </v-stack>
</template>

<script>
import VStack from "@/components/utilities/layout/VStack";
import HStack from "@/components/utilities/layout/HStack";
import Spacer from "@/components/utilities/layout/Spacer";
import Divider from "@/components/utilities/Divider";
import {PhArrowRight} from "phosphor-vue";
import _ from "lodash";

export default {
  name: "JumpModule",
  data() {
    return {
      targetQuestionIndex: ""
    }
  },
  components: {Divider, Spacer, HStack, VStack, PhArrowRight},
  computed: {
    isFinished() {
      return this.$store.state.questionModule.questionIndex === 99999;
    },
    getQuestionsCount() {
      return _.size(this.$store.state.questionModule.chapterInfo.question_ids)
    },
    getQuestionIndex() {
      return this.$store.state.questionModule.questionIndex + 1;
    }
  },
  methods: {
    jumpQuestion() {
      if (!isNaN(parseInt(this.targetQuestionIndex))) {
        this.$store.dispatch('jumpQuestion', (parseInt(this.targetQuestionIndex) - 1));
        this.targetQuestionIndex = "";
      }
    }
  }
}
</script>

<style scoped>

</style>
