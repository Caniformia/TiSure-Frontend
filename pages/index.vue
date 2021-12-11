<template>
  <div>
    <question-view v-if="viewSelector===1"/>
    <settings-view v-if="viewSelector===2"/>
    <lists-view v-if="viewSelector===3"/>
  </div>
</template>

<script>
import QuestionView from "@/components/QuestionView"
import SettingsView from "@/components/SettingsView"
import ListsView from "@/components/ListsView";

export default {
  name: "index",
  middleware: 'auth',
  components: {QuestionView, SettingsView, ListsView},
  computed: {
    viewSelector() {
      return this.$store.state.viewSelector;
    }
  },
  methods: {
    async fetchInfo() {
      await this.$store.dispatch('indexInit');
      await this.$store.dispatch('questionModule/questionModuleInit');
    }
  },
  created() {
    this.fetchInfo();
  }
}
</script>

<style scoped>

</style>
