<template>
  <v-stack class="py-8 px-6">
    <v-stack v-if="!showShare">
      <h-stack class="py-4">
        <p class="chinese-font text-4xl">题单</p>
        <spacer/>
        <button
          class="hover:border-gray-700"
          @click="onCrossButtonTapped"
        >
          <ph-x class="text-4xl m-0.5 hover:text-gray-700"/>
        </button>
      </h-stack>
      <v-stack v-if="isLoadingLists" class="h-full items-center">
        <spacer/>
        <div class="animate-spin black w-16 h-16 border-b-2 border-gray-900 rounded-full"></div>
        <spacer/>
      </v-stack>

      <v-stack v-if="!isLoadingLists">

        <new-list/>
        <lists-module class="py-4"/>

      </v-stack>
    </v-stack>
    <v-stack v-if="showShare">
      <h-stack class="py-4">
        <p class="chinese-font text-4xl">分享题单</p>
        <spacer/>
        <button
          class="hover:border-gray-700"
          @click="onCrossButtonTapped"
        >
          <ph-x class="text-4xl m-0.5 hover:text-gray-700"/>
        </button>
      </h-stack>


      <p class="chinese-font text-2xl">{{ listInfo.name }}</p>
      <h-stack>
        <p class="chinese-font text-md mr-2"> by </p>
        <p class="chinese-font text-md">{{ listInfo.owner.nickname }}</p>
      </h-stack>

      <p class="chinese-font my-4 text-2xl">复制下方链接，分享题单给朋友吧！</p>
      <h-stack>
        <p class="bold-font text-sm mr-2"> http://49.232.173.163/share/{{ listInfo.share_link }} </p>
      </h-stack>

    </v-stack>
  </v-stack>
</template>

<script>
import VStack from "@/components/utilities/layout/VStack";
import HStack from "@/components/utilities/layout/HStack";
import Spacer from "@/components/utilities/layout/Spacer";
import Divider from "@/components/utilities/Divider";
import {PhX, PhPlus} from "phosphor-vue";
import NewList from "@/components/views/lists/NewList";
import ListsModule from "@/components/views/lists/ListsModule";


export default {
  name: "ListsView",
  methods: {
    onCrossButtonTapped() {
      this.$store.commit('switchToLists');
      this.$store.commit('listsModule/setShowShare', false);
    },
    fetchInfo() {
      this.$store.dispatch('listsModule/listsModuleInit');
    }
  },
  components: {ListsModule, NewList, Divider, Spacer, HStack, VStack, PhX, PhPlus},
  computed: {
    isLoadingLists() {
      return this.$store.state.listsModule.isLoading;
    },
    showShare() {
      return this.$store.state.listsModule.showShare
    },
    listInfo() {
      return this.$store.state.listInfo;
    }
  },
  created() {
    this.fetchInfo();
  }
}
</script>

<style scoped>

</style>
