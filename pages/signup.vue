<template>
  <h-stack class="p-4 h-screen">
    <spacer/>
    <v-stack class="flex">
      <spacer/>
      <v-stack>
        <p class="chinese-font text-4xl mb-8">
          使用邮件地址注册 <span class="bold-font">TiSure</span>.
        </p>
        <v-stack class="">
          <div class="h-4"></div>
          <p class="medium-font-italic text-gray-800 text-lg ml-2 mb-0.5">Email</p>
          <input v-model="formContent.email" class="border border-black text-gray-900 rounded-full block w-full p-4">
          <div class="h-4"></div>
          <p class="medium-font-italic text-gray-800 text-lg ml-2 mb-0.5">Password</p>
          <input type="password" v-model="formContent.password"
                 class="border border-black text-gray-900 rounded-full block w-full p-4">
          <div class="h-4"></div>
          <h-stack>
            <a href="/login" class="chinese-font ml-2 text-sm">→&nbsp;已有帐号？登录。</a>
            <spacer/>
            <button v-on:click="register">
              <circle-button class="h-12 w-12">
                <spacer/>
                <ph-arrow-right class="text-lg font-bold m-0.5 hover:text-gray-700"/>
                <spacer/>
              </circle-button>
            </button>
          </h-stack>
        </v-stack>
      </v-stack>
      <spacer/>
    </v-stack>
    <spacer/>
  </h-stack>
</template>

<script>
import Spacer from "@/components/utilities/layout/Spacer";
import VStack from "@/components/utilities/layout/VStack";
import HStack from "@/components/utilities/layout/HStack";
import Divider from "@/components/utilities/Divider";
import CircleButton from "@/components/utilities/CircleButton";
import TiSureInput from "@/components/utilities/TiSureInput";
import {PhArrowRight} from "phosphor-vue";

var _ = require('lodash');

export default {
  name: "login",
  components: {
    CircleButton, TiSureInput,
    Divider, Spacer, VStack, HStack,
    PhArrowRight
  },
  data: function () {
    return {
      formContent: {
        email: "",
        password: "",
      },
      error: null,
    }
  },
  methods: {
    register() {
      let registerInfo = _.cloneDeep(this.formContent);
      this.$axios.$post("/api/auth", registerInfo).then((res) => {
        this.$router.push({path: '/login'});
      })
    },
  }
}
</script>

<style scoped>

</style>
