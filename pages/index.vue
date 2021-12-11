<template>
  <div>
    <question-view v-if="viewSelector===1"/>
    <settings-view v-if="viewSelector===2"/>
  </div>
</template>

<script>
import QuestionView from "@/components/QuestionView"
import SettingsView from "@/components/SettingsView"

export default {
  name: "index",
  components: {QuestionView, SettingsView},
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
