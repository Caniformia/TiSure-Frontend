<template>
  <v-stack class="py-8 px-6">
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
    <JumpModule/>
    <chapter-switch/>
    <subject-switch/>
    <log-out-component/>
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
import LogOutComponent from "@/components/views/settings/LogOutComponent";
import JumpModule from "@/components/views/settings/JumpModule";

export default {
  name: "settings",
  components: {JumpModule, LogOutComponent, ChapterSwitch, SubjectSwitch, Divider, Spacer, HStack, VStack, PhX},
  methods: {
    onCrossButtonTapped() {
      this.$store.commit('switchToSettings');
    }
  }
}
</script>

<style scoped>

</style>
