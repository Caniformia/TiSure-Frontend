<template>
  <stack class="p-4 h-screen flex-col md:flex-row">
    <v-stack class="h-full md:flex-grow overflow-auto">
      <question-navigation-module/>
      <h-stack v-if="isFinished">
        <spacer/>
        <p class="chinese-font m-8 text-md"> 题都被你做完啦！请切换题单或章节~</p>
        <spacer/>
      </h-stack>
      <question-module class="flex-grow m-4 md:mx-0 overflow-auto scrollbar-hide"
                       :question-title="questionTitle"
                       :options="questionOptions"
                       :key="currentQuestionID"
                       v-if="forRerenderQuestionModule && !isFinished"
      />
      <v-stack v-if="!forRerenderQuestionModule && !isFinished" class="h-full items-center">
        <spacer/>
        <div class="animate-spin black w-16 h-16 border-b-2 border-gray-900 rounded-full"></div>
        <spacer/>
      </v-stack>
    </v-stack>
    <bottom-tool-box class="md:ml-4"/>
  </stack>
</template>

<script>
import VStack from "@/components/utilities/layout/VStack";
import QuestionNavigationModule from "@/components/views/main/QuestionNavigationModule";
import Spacer from "@/components/utilities/layout/Spacer";
import BottomToolBox from "@/components/views/main/BottomToolBox";
import Stack from "@/components/utilities/layout/Stack";
import QuestionModule from "@/components/views/main/QuestionModule";
import {viewStateEnum} from "@/extensions/types/viewStateEnum";
import HStack from "@/components/utilities/layout/HStack";

export default {
  name: "index",
  middleware: 'auth',
  computed: {
    isFinished() {
      return this.$store.state.questionModule.questionIndex === 99999;
    },
    forRerenderQuestionModule() {
      return this.$store.state.questionModule.rerenderQuestionModule;
    },
    currentSubjectID() {
      return this.$store.state.questionModule.currentSubjectID;
    },
    currentChapterID() {
      return this.$store.state.questionModule.subjectInfo.chapters[
        this.$store.state.questionModule.chapterIndex
        ].id;
    },
    currentQuestionID() {
      if (this.$store.state.questionModule.chapterInfo === null) {
        return -1;
      } else {
        return this.$store.state.questionModule.chapterInfo.question_ids[
          this.$store.state.questionModule.questionIndex
          ];
      }
    },
    currentQuestionInfo() {
      return this.$store.state.questionModule.questionInfo;
    },
    questionTitle() {
      if (this.$store.state.questionModule.questionInfo === null) {
        return "";
      } else {
        return this.$store.state.questionModule.questionInfo.content;
      }
    },
    questionOptions() {
      if (this.$store.state.questionModule.questionInfo === null) {
        return [];
      } else {
        return this.$store.state.questionModule.questionInfo.choices;
      }
    }
  },
  components: {HStack, QuestionModule, Stack, BottomToolBox, Spacer, QuestionNavigationModule, VStack},
  methods: {
    fetchInfo() {
      // this.$store.dispatch('questionModule/questionModuleInit');
    }
  },
  created() {
    this.fetchInfo();
  }
}
</script>
