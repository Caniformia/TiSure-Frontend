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
          <div class="chinese-font text-md ml-2 mr-6"
               :class="{'text-white':isReverse(index)}">
            {{ chapter.name }}
          </div>
          <spacer/>
          <div class="chinese-font text-md text-left pr-2"
               :class="{'text-white':isReverse(index)}">
            156 / 954
          </div>
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

export default {
  name: "ChapterSwitch",
  components: {Spacer, VStack, HStack},
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
