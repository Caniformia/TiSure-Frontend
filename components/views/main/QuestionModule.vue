<template>
  <stack class="flex-col md:flex-row ">
    <img v-if="hasImage" class="object-contain md:max-w-md md:px-8"
         :src="imageUrl"/>
    <stack class="flex-col flex-grow md:overflow-auto scrollbar-hide">
      <div class="w-full h-2/5 flex-shrink-0">
        <div class="question-content-text font-medium chinese-font min-h-20 h-full w-full">
          {{ questionTitle }}
        </div>
      </div>
      <v-stack class="flex-shrink-0">
        <div class="w-full" v-for="(option,index) in options">
          <choice-button class="my-2 w-full"
                         :key="option.id"
                         :option-index="option.id"
                         :answer-tag-id="getAnswerTag(index)"
                         :is-answer="option.is_answer"
                         :title="option.content"/>
        </div>
      </v-stack>
      <hr v-if="showInteractModule" class="mt-8 mb-8"/>
      <statistic-module class="mb-8" v-if="showInteractModule"/>
      <comment-module v-if="showInteractModule"/>
    </stack>
  </stack>
</template>

<script>
import VStack from "~/components/utilities/layout/VStack";
import textFit from 'textfit'
import ChoiceButton from "~/components/views/main/question/ChoiceButton";
import Stack from "~/components/utilities/layout/Stack";
import CommentModule from "@/components/views/main/CommentModule";
import Divider from "@/components/utilities/Divider";
import {viewStateEnum} from "@/extensions/types/viewStateEnum";
import StatisticModule from "@/components/views/main/StatisticModule";

export default {
  name: "QuestionModule",
  computed: {
    showInteractModule() {
      return this.$store.state.questionModule.viewState === viewStateEnum.SUMMARY
    },
    hasImage() {
      return this.$store.state.questionModule.questionInfo.image_url !== null;
    },
    imageUrl() {
      if (this.$store.state.questionModule.questionInfo.image_url !== null) {
        return "/api/" +
          this.$store.state.questionModule.questionInfo.image_url;
      } else {
        return ""
      }
    }
  },
  components: {StatisticModule, Divider, CommentModule, Stack, ChoiceButton, VStack},
  props: {
    questionTitle: {
      type: String,
      default: ""
    },
    options: {
      type: [],
      default: []
    }
    // options: {
    //   type: [],
    //   default: []
    // }
  },
  created() {
    if (process.browser) {
      window.addEventListener("resize", this.reFitText);
    }
  },
  mounted() {
    this.$forceUpdate()
    this.reFitText();
  },
  methods: {
    reFitText() {
      textFit(document.getElementsByClassName('question-content-text'),
        {
          alignVert: true, // if true, textFit will align vertically using css tables
          alignHoriz: false, // if true, textFit will set text-align: center
          multiLine: true, // if true, textFit will not set white-space: no-wrap
          detectMultiLine: true, // disable to turn off automatic multi-line sensing
          minFontSize: 6,
          maxFontSize: 40,
          reProcess: true, // if true, textFit will re-process already-fit nodes. Set to 'false' for better performance
          widthOnly: false, // if true, textFit will fit text to element width, regardless of text height
          alignVertWithFlexbox: false, // if true, textFit will use flexbox for vertical alignment
        });
    },
    getAnswerTag(index) {
      return String.fromCharCode('A'.charCodeAt(0) + index);
    },
  }
}
</script>

<style scoped>

</style>
