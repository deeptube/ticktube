<template>
  <div class="root">
    <div v-if="isPlayable">
      <video-list :video-items="videoItems" @reachEnd="handleOnReachEnd"></video-list>
    </div>
    <div v-else class="root-init">
      <init-form :submitable="isMobile" @submit="handleOnSubmit"></init-form>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import VideoList from "@js/components/youtube/VideoList.vue";
import InitForm from "@js/components/youtube/InitForm.vue";
import { ApiClient } from "@js/services/youtubeDataApi/apiClient";
import { InitFormType, SearchResultItem, SearchResult } from "@js/types/youtubeApi";

interface Data {
  apiKey: string;
  keyword: string;
  nextPageToken: string;
  videoItems: SearchResultItem[];
}

export default Vue.extend({
  components: {
    VideoList,
    InitForm,
  },
  data(): Data {
    return {
      apiKey: "",
      keyword: "",
      nextPageToken: "",
      videoItems: [],
    };
  },
  computed: {
    client: function (): ApiClient {
      return new ApiClient(this.apiKey);
    },
    isPlayable: function (): boolean {
      return !!this.apiKey;
    },
    isMobile: function (): boolean {
      return !!navigator.userAgent.match(/iPhone|Android|Mobile/);
    },
  },
  methods: {
    getSerchResult: async function (): Promise<void> {
      const ret: SearchResult = await this.client.search(this.keyword, this.nextPageToken);
      if (ret.nextPageToken) this.nextPageToken = ret.nextPageToken;
      this.videoItems.push(...ret.items);
    },
    handleOnReachEnd: async function (): Promise<void> {
      await this.getSerchResult();
    },
    handleOnSubmit: async function (object: InitFormType): Promise<void> {
      this.apiKey = object.apiKey;
      this.keyword = object.keyword;
      await this.getSerchResult();
    },
  },
});
</script>
