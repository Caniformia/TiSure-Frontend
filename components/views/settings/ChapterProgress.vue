<template>
  <div class="chinese-font text-md text-left pr-2">
    {{chapterProgress}}
  </div>
</template>

<script>
export default {
  name: "chapterProgress",
  props: {
    chapterID:{
      type: Number
    }
  },
  data() {
    return {
      chapterProgress: ""
    }
  },
  methods: {
    getChapterProgress() {
      this.$axios.$get("/api/chapters/" + this.chapterID + "/progress").then(r => {
        this.chapterProgress = r.progress_count + "/" + r.total_count
      })
    }
  },
  created() {
    this.getChapterProgress();
  }
}
</script>

<style scoped>

</style>
