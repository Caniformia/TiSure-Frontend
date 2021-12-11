<template>

  <v-stack>
    <h-stack class="my-2">
      <p class="chinese-font text-2xl">题单列表</p>
      <spacer/>
      <p class="bold-font text-lg mr-4">{{ getListsCount }}</p>
    </h-stack>
    <div class="w-full" v-for="(list, index) in lists">
      <h-stack class="items-center">
        <button @click="handleTapped(list.id)"
                class="border border-black rounded-3xl w-full my-2"
                :class="{'bg-black' : isReverse(list.id)}"
                :disabled="isReverse(list.id)"
        >
          <HStack class="m-2 items-center">
            <div class="chinese-font text-md ml-2 mr-6"
                 :class="{'text-white':isReverse(list.id)}">
              {{ list.name }}
            </div>
            <spacer/>
            <div class="chinese-font text-md text-left pr-2"
                 :class="{'text-white':isReverse(list.id)}">
              156 / 954
            </div>
          </HStack>
        </button>
        <div class="px-2 pt-1">
          <button
            class="flex-shrink bg-black border-black border rounded-full hover:border-gray-700"
            @click="onSettingsButtonTapped"
          >
            <ph-plus weight="bold" class="text-xl text-white m-1 hover:text-gray-700"/>
          </button>
        </div>
        <div class="pr-2 pt-1">
        <button
          class="flex-shrink bg-black border-black border rounded-full hover:border-gray-700"
          @click="onSettingsButtonTapped"
        >
          <ph-arrow-bend-up-right weight="bold" class="text-xl text-white m-1 hover:text-gray-700"/>
        </button>
      </div>
      </h-stack>
    </div>
  </v-stack>
</template>

<script>
import HStack from "@/components/utilities/layout/HStack";
import VStack from "@/components/utilities/layout/VStack";
import _ from "lodash";
import Spacer from "@/components/utilities/layout/Spacer";
import {PhPlus, PhArrowBendUpRight} from "phosphor-vue";

export default {
  name: "ListsModule",
  components: {Spacer, VStack, HStack, PhPlus, PhArrowBendUpRight},
  computed: {
    getListsCount() {
      return _.size(this.$store.state.listsModule.lists);
    },
    lists() {
      return this.$store.state.listsModule.lists;
    }
  },
  methods: {
    handleTapped(listID) {
      if (subjectID !== this.$store.state.questionModule.currentSubjectID) {
        // this.$store.dispatch('switchSubject', subjectID);
      }
    },
    isReverse(listID) {
      return (this.$store.state === listID);
    }
  }
}
</script>

<style scoped>

</style>
