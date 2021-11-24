<template>
  <button @click="handleTapped"
          class="border border-black rounded-3xl"
          :class="{
    'bg-black' : isReverse,
    'opacity-50' : isFading,
    'opacity-25' : isFaded
  }">
    <HStack class="m-2 items-center">
      <div class="chinese-font font-bold text-xl ml-2 mr-6"
           :class="{'text-white':isReverse}">
        {{ this.answerTagId }}
      </div>
      <div class="chinese-font text-md text-left pr-2"
           :class="{'text-white':isReverse}">
        {{ this.title }}
      </div>
      <spacer/>
      <h-stack v-if="showCheckMark" class="w-8 h-8 flex-shrink-0">
        <ph-check-circle class="text-white w-full h-full flex-shrink-0" weight="fill"/>
      </h-stack>
      <h-stack v-if="showXMark" class="w-8 h-8 flex-shrink-0">
        <ph-x-circle class="text-white w-full h-full flex-shrink-0" weight="fill"/>
      </h-stack>
    </HStack>
  </button>
</template>

<script>
import HStack from "~/components/utilities/layout/HStack";
import {viewStateEnum} from "@/extensions/types/viewStateEnum";
import {PhCheckCircle, PhXCircle} from "phosphor-vue";
import Spacer from "@/components/utilities/layout/Spacer";

var _ = require("lodash");

export default {
  name: "ChoiceButton",
  components: {Spacer, HStack, PhCheckCircle, PhXCircle},
  computed: {
    nowViewState() {
      return this.$store.state.questionModule.viewState;
    },
    isReverse() {
      switch (this.nowViewState) {
        case viewStateEnum.CHECKING:
          return _.includes(this.$store.state.questionModule.selectedOptions, this.optionIndex);
        case viewStateEnum.SUMMARY:
        case viewStateEnum.VERIFYING:
          return _.includes(this.$store.state.questionModule.selectedOptions, this.optionIndex)
            || this.isAnswer
      }
    },
    showCheckMark() {
      return ((this.nowViewState === viewStateEnum.SUMMARY) ||
          (this.nowViewState === viewStateEnum.VERIFYING)) &&
        this.isAnswer
    },
    showXMark() {
      return ((this.nowViewState === viewStateEnum.SUMMARY) ||
          (this.nowViewState === viewStateEnum.VERIFYING)) &&
        !this.isAnswer &&
        _.includes(this.$store.state.questionModule.selectedOptions, this.optionIndex)
    },
    isFaded() {
      return ((this.nowViewState === viewStateEnum.SUMMARY) ||
        (this.nowViewState === viewStateEnum.VERIFYING)) &&
        !this.isAnswer &&
        !_.includes(this.$store.state.questionModule.selectedOptions, this.optionIndex)
    },
    isFading() {
      return ((this.nowViewState === viewStateEnum.SUMMARY) ||
          (this.nowViewState === viewStateEnum.VERIFYING)) &&
        !this.isAnswer &&
        _.includes(this.$store.state.questionModule.selectedOptions, this.optionIndex)
    }
  },
  props: {
    answerTagId: {
      type: String,
      default: "A"
    },
    title: {
      type: String,
      default: "example"
    },
    optionIndex: {
      type: Number,
      default: 0
    },
    isAnswer: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleTapped() {
      if (this.nowViewState === viewStateEnum.CHECKING) {
        this.$store.commit('questionModule/switchAnswerSelected', this.optionIndex);
        console.log(this.$store.state["questionModule/selectedOptions"]);
      }
    }
  }
}
</script>

<style scoped>

</style>
