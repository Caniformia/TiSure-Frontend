<template>
  <v-stack>
    <h-stack class="my-2">
      <p class="chinese-font text-2xl">用户登出</p>
    </h-stack>
    <div class="w-full">
      <button @click="logout"
              class="border border-black rounded-3xl w-full my-2"
      >
        <HStack class="m-2 items-center">
          <spacer/>
          <div class="chinese-font text-md ml-2 mr-6">
            登出当前用户
          </div>
          <spacer/>
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
import {viewStateEnum} from "@/extensions/types/viewStateEnum";

export default {
  name: "LogOutComponent",
  components: {Spacer, VStack, HStack},
  methods: {
    async logout() {
      await this.$auth.logout()
        .then(
          () => {
            localStorage.removeItem("access-token")
            localStorage.removeItem("client")
            localStorage.removeItem("uid")
            localStorage.removeItem("token-type")
            this.$store.dispatch('emptyToInit');
          }
        )
    }
  }
}
</script>

<style scoped>

</style>
