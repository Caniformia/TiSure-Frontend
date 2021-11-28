<template>
  <v-stack>
    <h-stack class="items-end mb-4">
      <p class="chinese-font text-4xl">评论</p>
      <spacer/>
      <p class="bold-font text-lg mr-4">{{ getCommentCount }}</p>
    </h-stack>
    <div class="relative">
      <input v-model="commentMessage" class="border border-black text-gray-900 rounded-full block w-full p-4">
      <div class="absolute top-4 right-4">
        <button @click="submitComment" class="bg-black border-black border rounded-full hover:border-gray-700">
          <ph-arrow-fat-line-up weight="fill" class="text-white text-lg m-1 hover:opacity-75"/>
        </button>
      </div>
    </div>
    <div class="h-4"></div>
    <div class="w-full px-4" v-for="(comment,index) in getComments">
      <v-stack class="my-4">
        <p class="chinese-font text-xl">
          {{comment.content}}
        </p>
        <p class="chinese-font text-md">
          {{ getCommentTime(comment.created_at) }}
        </p>
      </v-stack>
    </div>
  </v-stack>
</template>

<script>
import VStack from "@/components/utilities/layout/VStack";
import HStack from "@/components/utilities/layout/HStack";
import Spacer from "@/components/utilities/layout/Spacer";
import Divider from "@/components/utilities/Divider";
import {PhArrowFatLineUp, PhBookOpen, PhList} from "phosphor-vue";
import moment from 'moment';
var _ = require("lodash");


export default {
  name: "CommentModule",
  data() {
    return {
      commentMessage: ""
    }
  },
  computed: {
    getCommentCount(){
      return _.size(this.$store.state.questionModule.comments);
    },
    getComments() {
      return this.$store.state.questionModule.comments;
    }
  },
  components: {Divider, Spacer, HStack, VStack, PhArrowFatLineUp},
  methods: {
    getCommentTime(commentTime) {
      moment.locale('zh-cn')
      return moment(commentTime).fromNow();
    },
    submitComment() {
      if (this.commentMessage !== "") {
        this.$store.dispatch('questionModule/submitComment',this.commentMessage);
        this.commentMessage = "";
      //   this.$axios.$post("/api/questions/"
      //     + this.$store.state.questionModule.questionInfo.id
      //     + "/comments",
      //     {
      //       question_id: this.$store.state.questionModule.questionInfo.id,
      //       content: this.commentMessage
      //     }).then(r => {
      //     this.$axios.$get("/api/questions/"
      //       + this.$store.state.questionModule.questionInfo.id
      //       + "/comments").then(res => {
      //       this.$store.commit("questionModule/setComments", res);
      //       this.commentMessage = "";
      //     })
      //   })
      }
    }
  }
}
</script>

<style scoped>

</style>
