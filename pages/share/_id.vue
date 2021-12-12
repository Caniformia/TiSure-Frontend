<template>
  <v-stack class="py-8 px-6">
    <v-stack>
      <h-stack class="py-4">
        <p class="chinese-font text-4xl">分享题单</p>
      </h-stack>
      <v-stack v-if="!forked">
      <p class="chinese-font my-4 text-2xl">请输入复制题单的新名字。</p>

      <div class="relative">
        <input v-model="newName" class="border border-black text-gray-900 rounded-full block w-full p-4">
        <div class="absolute top-4 right-4">
          <button @click="submitFork" class="bg-black border-black border rounded-full hover:border-gray-700">
            <ph-arrow-fat-line-up weight="fill" class="text-white text-lg m-1 hover:opacity-75"/>
          </button>
        </div>
      </div>
      </v-stack>
      <v-stack v-if="forked">
        <p class="chinese-font my-4 text-2xl">题单已成功添加。</p>

      </v-stack>

    </v-stack>
  </v-stack>
</template>

<script>
import VStack from "@/components/utilities/layout/VStack";
import HStack from "@/components/utilities/layout/HStack";
import Spacer from "@/components/utilities/layout/Spacer";
import {PhArrowFatLineUp} from "phosphor-vue";

export default {
  components: {Spacer, HStack, VStack, PhArrowFatLineUp},
  middleware: "auth",
  data() {
    return {
      newName: "",
      forked: false
    }
  },
  methods:{
    submitFork() {
      if (this.newName!=="") {
        this.$axios.$post("/api/question_lists",{
          name: this.newName,
          visibility: "shared",
          forked_from_link: this.$route.params.id
        }).then(r=>{
          this.forked = true;
        })
      }
    }
  },
  created() {

  }
}
</script>

<style scoped>

</style>
