<template>
  <div :id="videoId" class="yotube-player">
    <iframe type="text/html" width="100%" :src="videoSrc()" frameborder="0" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
const YOUTUBE_URL = "https://www.youtube.com";

export default Vue.extend({
  props: {
    videoId: {
      type: String,
      required: true,
    },
  },
  methods: {
    videoSrc(): string {
      const prams = `autoplay=1&enablejsapi=1&origin=${window.location.origin}&playsinline=1`;
      return `${YOUTUBE_URL}/embed/${this.videoId}?${prams}`;
    },
  },
});
</script>
