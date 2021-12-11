<template>
  <stack class="flex-row md:flex-col-reverse">
    <stack class="flex-row md:flex-col-reverse my-1 md:my-0 md:mx-1">
      <button class="border-black border rounded-full mr-1.5 md:mt-1.5 md:mr-0 hover:border-gray-700">
        <ph-bookmark-simple class="text-md m-0.5 hover:text-gray-700"/>
      </button>
      <button @click="onMemoryButtonTapped"
              class="border-black border rounded-full hover:opacity-75"
              :class="isMemoryMode ? 'bg-black':''"
      >
        <ph-book-open
          v-if="!isMemoryMode"
          class="text-md m-0.5 hover:opacity-75"
        />
        <ph-book-open
          v-if="isMemoryMode"
          class="text-md m-0.5 hover:opacity-75 text-white"
          weight="fill"
        />
      </button>
      <divider class="block md:hidden"/>
      <divider :horizontal=false class="hidden md:block"/>
    </stack>

    <button
      :class="isLargeButtonDisabled ? 'animate-pulse': ''"
      :disabled="isLargeButtonDisabled"
      @click="onLargeButtonTapped"
      class="active:opacity-75 flex-grow bg-black rounded-full"
    />
    <stack class="flex-row md:flex-col-reverse my-1 md:my-0 md:mx-1">
      <divider class="block md:hidden"/>
      <divider :horizontal=false class="hidden md:block"/>
      <button
        class="border-black border rounded-full hover:border-gray-700"
        @click="onSettingsButtonTapped"
      >
        <ph-list class="text-md m-0.5 hover:text-gray-700"/>
      </button>
    </stack>
  </stack>
</template>

<script>
import HStack from "~/components/utilities/layout/HStack";
import {PhBookmarkSimple, PhBookOpen, PhList} from "phosphor-vue";
import Stack from "~/components/utilities/layout/Stack";
import Divider from "~/components/utilities/Divider";
import LargeButton from "~/components/utilities/LargeButton";
import {viewStateEnum} from "@/extensions/types/viewStateEnum";
import login from "@/pages/login";

var _ = require("lodash");

export default {
  name: "BottomToolBox",
  components: {LargeButton, Divider, Stack, HStack, PhBookmarkSimple, PhBookOpen, PhList},
  computed: {
    currentQuestionID() {
      if (this.$store.state.questionModule.chapterInfo === null) {
        return -1;
      } else {
        return this.$store.state.questionModule.chapterInfo.questions[
          this.$store.state.questionModule.questionIndex
          ].id;
      }
    },
    isMemoryMode() {
      return this.$store.state.questionModule.isMemoryMode;
    },
    isLargeButtonDisabled() {
      return !this.$store.state.questionModule.rerenderQuestionModule;
    }
  },
  methods: {
    onMemoryButtonTapped() {
      this.$store.commit('questionModule/switchMemoryMode');
    },
    onLargeButtonTapped() {
      this.$store.dispatch('questionModule/switchViewState');
    },
    onSettingsButtonTapped() {
      this.$store.commit('switchToSettings');
    }
  }
}
</script>

<style scoped>

</style>
