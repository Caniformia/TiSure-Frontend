<template>
  <button class="border border-black rounded-3xl">
    <HStack class="m-2 items-center">
      <div class="chinese-font font-bold text-xl ml-2 mr-4">
        {{this.answerTagId}}
      </div>
      <div class="chinese-font text-md">
        {{ this.title }}
      </div>
    </HStack>
  </button>
</template>

<script>
import HStack from "~/components/utilities/layout/HStack";
export default {
  name: "ChoiceButton",
  props: {
    answerTagId: {
      type: String,
      default: "A"
    },
    title: {
      type: String,
      default: "example"
    }
  },
  components: {HStack}
}
</script>

<style scoped>

</style>
