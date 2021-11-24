<template>
  <h-stack class="p-4 h-screen">
    <spacer/>
    <v-stack class="flex">
      <spacer/>
      <v-stack>
        <p class="chinese-font text-4xl mb-8">
          请登录以继续使用 <span class="bold-font">TiSure</span>.
        </p>
        <v-stack class="">
          <div class="h-4"></div>
          <p class="medium-font-italic text-gray-800 text-lg ml-2 mb-0.5">Email</p>
          <input v-model="email" class="border border-black text-gray-900 rounded-full block w-full p-4">
          <div class="h-4"></div>
          <p class="medium-font-italic text-gray-800 text-lg ml-2 mb-0.5">Password</p>
          <input type="password" v-model="password" class="border border-black text-gray-900 rounded-full block w-full p-4">
          <div class="h-4"></div>
          <h-stack>
            <a href="/signup" class="chinese-font ml-2 text-sm">→&nbsp;注册新账号</a>
            <spacer/>
            <button v-on:click="login">
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

export default {
  name: "login",
  components: {
    CircleButton, TiSureInput,
    Divider, Spacer, VStack, HStack,
    PhArrowRight
  },
  data: function () {
    return {
      email: '',
      password: '',
      error: null,
    }
  },
  methods: {
    async login() {
      await this.$auth.loginWith('local', {
        data: {
          password: this.password,
          email: this.email
        }
      })
        .then(
          (response) => {

          },
          (error) => {
            this.error = error.response.data.errors
          }
        )
    }
  }
}
</script>

<style scoped>

</style>
