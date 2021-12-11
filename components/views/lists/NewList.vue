<template>
  <v-stack>
    <h-stack class="my-2">
      <p class="chinese-font text-2xl">创建新题单</p>
      <spacer/>
      <p class="bold-font text-lg mr-4">{{ getSubjectsCount }}</p>
    </h-stack>
    <div class="relative">
      <input v-model="listName" class="border border-black text-gray-900 rounded-full block w-full p-4">
      <div class="absolute top-4 right-4">
        <button @click="submitNewList" class="bg-black border-black border rounded-full hover:border-gray-700">
          <ph-list-plus weight="bold" class="text-white text-lg m-1 hover:opacity-75"/>
        </button>
      </div>
    </div>
  </v-stack>
</template>

<script>
import VStack from "@/components/utilities/layout/VStack";
import HStack from "@/components/utilities/layout/HStack";
import Spacer from "@/components/utilities/layout/Spacer";
import Divider from "@/components/utilities/Divider";
import {PhX, PhListPlus} from "phosphor-vue";

export default {
  name: "NewList",
  data() {
    return {
      listName: ""
    }
  },
  components: {Divider, Spacer, HStack, VStack, PhX, PhListPlus},
  methods: {
    submitNewList() {
      if (this.listName !== "") {
        this.$store.dispatch('listsModule/addList',this.listName);
        this.listName = "";
      }
    }
  }
}
</script>

<style scoped>

</style>
