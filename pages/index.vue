<template>
  <stack class="p-4 h-screen flex-col md:flex-row">
    <v-stack class="h-full overflow-auto md:flex-grow">
      <question-navigation-module/>
      <question-module class="flex-grow m-4 overflow-auto md:mx-0 scrollbar-hide"/>
    </v-stack>
    <bottom-tool-box class="md:ml-4"/>
  </stack>
</template>

<script>
import VStack from "~/components/utilities/layout/VStack";
import QuestionNavigationModule from "~/components/views/main/QuestionNavigationModule";
import Spacer from "~/components/utilities/layout/Spacer";
import BottomToolBox from "~/components/views/main/BottomToolBox";
import Stack from "~/components/utilities/layout/Stack";
import QuestionModule from "~/components/views/main/QuestionModule";

export default {
  components: {QuestionModule, Stack, BottomToolBox, Spacer, QuestionNavigationModule, VStack}
}
</script>
