<template>
  <v-stack>
    <h-stack class="my-2">
      <p class="chinese-font text-2xl">题库切换</p>
      <spacer/>
      <p class="bold-font text-lg mr-4">{{ getSubjectsCount }}</p>
    </h-stack>
    <div class="w-full" v-for="(subject, index) in subjects">
      <button @click="handleTapped(subject.id)"
              class="border border-black rounded-3xl w-full my-2"
              :class="{'bg-black' : isReverse(subject.id)}"
              :disabled = "isReverse(subject.id)"
      >
        <HStack class="m-2 items-center">
          <div class="chinese-font text-md ml-2 mr-6"
               :class="{'text-white':isReverse(subject.id)}">
            航概（{{ subject.name }}）
          </div>
          <spacer/>
          <div class="chinese-font text-md text-left pr-2"
               :class="{'text-white':isReverse(subject.id)}">
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
  name: "SubjectSwitch",
  components: {Spacer, VStack, HStack},
  computed: {
    getSubjectsCount() {
      return _.size(this.$store.state.subjectsInfo);
    },
    subjects() {
      return this.$store.state.subjectsInfo;
    }
  },
  methods: {
    handleTapped(subjectID) {
      if (subjectID !== this.$store.state.questionModule.currentSubjectID) {
        this.$store.dispatch('switchSubject', subjectID);
      }
    },
    isReverse(subjectID) {
      return (this.$store.state.questionModule.currentSubjectID === subjectID);
    }
  }
}
</script>

<style scoped>

</style>
