<template>
  <v-stack>
    <h-stack class="my-2">
      <p class="chinese-font text-2xl">章节切换</p>
      <spacer/>
      <p class="bold-font text-lg mr-4">{{ getChaptersCount }}</p>
    </h-stack>
    <div class="w-full" v-for="(chapter, index) in chapters">
      <button @click="handleTapped(index)"
              class="border border-black rounded-3xl w-full my-2"
              :class="{'bg-black' : isReverse(index)}"
              :disabled = "isReverse(index)"
      >
        <HStack class="m-2 items-center">
          <div class="chinese-font pr-1 opacity-60"
               :class="{'text-white':isReverse(index)}"
          >
            第{{ numberToKanji[index + 1] }}章
          </div>

          <div class="chinese-font text-md ml-1 mr-2"
               :class="{'text-white':isReverse(index)}">
            {{ chapter.name }}
          </div>
          <spacer/>
          <chapter-progress :chapter-i-d="chapter.id"
            :class="{'text-white':isReverse(index)}"/>
        </HStack>
      </button>
    </div>
  </v-stack>
</template>

<script>
import HStack from "@/components/utilities/layout/HStack";
import VStack from "@/components/utilities/layout/VStack";
import _ from "lodash";
import Spacer from "@/components/utilities/layout/Spacer";
import ChapterProgress from "@/components/views/settings/ChapterProgress";

export default {
  name: "ChapterSwitch",
  components: {ChapterProgress, Spacer, VStack, HStack},
  data(){
    return {
      numberToKanji: ["零","一","二","三","四","五","六","七","八","九"]
    }
  },
  computed: {
    getChaptersCount() {
      return _.size(this.$store.state.questionModule.subjectInfo.chapters);
    },
    chapters() {
      return this.$store.state.questionModule.subjectInfo.chapters;
    }
  },
  methods: {
    handleTapped(chapterIndex) {
      if (this.$store.state.questionModule.chapterIndex !== chapterIndex) {
        this.$store.dispatch('switchChapter', chapterIndex);
      }
    },
    isReverse(chapterIndex) {
      return (this.$store.state.questionModule.chapterIndex === chapterIndex);
    }
  }
}
</script>

<style scoped>

</style>
