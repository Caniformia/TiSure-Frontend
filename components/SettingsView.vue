<template>
  <v-stack class="p-8">
    <h-stack class="py-4">
      <p class="chinese-font text-4xl">设置</p>
      <spacer/>
      <button
        class="hover:border-gray-700"
        @click="onCrossButtonTapped"
      >
        <ph-x class="text-4xl m-0.5 hover:text-gray-700"/>
      </button>
    </h-stack>
    <subject-switch/>
    <chapter-switch/>
  </v-stack>
</template>

<script>
import VStack from "@/components/utilities/layout/VStack";
import HStack from "@/components/utilities/layout/HStack";
import Spacer from "@/components/utilities/layout/Spacer";
import Divider from "@/components/utilities/Divider";
import {PhX} from "phosphor-vue";
import SubjectSwitch from "@/components/views/settings/SubjectSwitch";
import ChapterSwitch from "@/components/views/settings/ChapterSwitch";

export default {
  name: "settings",
  components: {ChapterSwitch, SubjectSwitch, Divider, Spacer, HStack, VStack, PhX},
  methods: {
    onCrossButtonTapped() {
      this.$store.commit('switchToSettings');
    }
  }
}
</script>

<style scoped>

</style>
