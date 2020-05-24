<template>
  <div class="root">
    <video-list v-if="isPlayable" :api-key="apiKey" :keyword="keyword"></video-list>
    <div v-else class="root-init">
      <init-form :submitable="isMobile" @submit="handleOnSubmit"></init-form>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import VideoList from "@js/components/youtube/VideoList.vue";
import InitForm from "@js/components/youtube/InitForm.vue";
import { InitFormType } from "@js/types/youtubeApi";

export default Vue.extend({
  components: {
    VideoList,
    InitForm,
  },
  data(): InitFormType {
    return {
      apiKey: "",
      keyword: "",
    };
  },
  computed: {
    isPlayable: function (): boolean {
      return !!this.apiKey;
    },
    isMobile: function (): boolean {
      return !!navigator.userAgent.match(/iPhone|Android|Mobile/);
    },
  },
  methods: {
    handleOnSubmit: function (object: InitFormType): void {
      this.apiKey = object.apiKey;
      this.keyword = object.keyword;
    },
  },
});
</script>
