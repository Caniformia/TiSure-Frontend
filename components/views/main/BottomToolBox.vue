<template>
  <stack class="flex-row md:flex-col-reverse">
    <stack class="flex-row md:flex-col-reverse my-1 md:my-0 md:mx-1">
      <button class="border-black border rounded-full mr-1.5 md:mt-1.5 md:mr-0 hover:border-gray-700">
        <ph-bookmark-simple class="text-md m-0.5 hover:text-gray-700"/>
      </button>
      <button class="border-black border rounded-full hover:border-gray-700">
        <ph-book-open class="text-md m-0.5 hover:text-gray-700"/>
      </button>
      <divider class="block md:hidden"/>
      <divider :horizontal=false class="hidden md:block"/>
    </stack>
    <large-button/>
    <stack class="flex-row md:flex-col-reverse my-1 md:my-0 md:mx-1">
      <divider class="block md:hidden"/>
      <divider :horizontal=false class="hidden md:block"/>
      <button class="border-black border rounded-full hover:border-gray-700">
        <ph-list class="text-md m-0.5 hover:text-gray-700"/>
      </button>
    </stack>
  </stack>
</template>

<script>
import HStack from "~/components/utilities/layout/HStack";
import {PhBookmarkSimple, PhBookOpen, PhList} from "phosphor-vue";
import Stack from "~/components/utilities/layout/Stack";
import Divider from "~/components/utilities/Divider";
import LargeButton from "~/components/utilities/LargeButton";

export default {
  name: "BottomToolBox",
  components: {LargeButton, Divider, Stack, HStack, PhBookmarkSimple, PhBookOpen, PhList}
}
</script>

<style scoped>

</style>
