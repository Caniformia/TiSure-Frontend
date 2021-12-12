<template>

  <div class="chinese-font text-md text-left pr-2">
    {{subjectProgress}}
  </div>
</template>

<script>
export default {
  name: "SubjectProgress",
  props: {
    subjectID:{
      type: Number
    }
  },
  data() {
    return {
      subjectProgress: ""
    }
  },
  methods: {
    getSubjectProgress() {
      this.$axios.$get("/api/subjects/" + this.subjectID + "/progress").then(r => {
        this.subjectProgress = r.progress_count + "/" + r.total_count
      })
    }
  },
  created() {
    this.getSubjectProgress();
  }
}
</script>

<style scoped>

</style>
