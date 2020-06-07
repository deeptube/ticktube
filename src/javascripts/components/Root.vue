<template>
  <div class="root">
    <div v-if="isPlayable">
      <loading
        :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true"
        color="#fff"
        background-color="#000"
      ></loading>
      <video-list :video-items="videoItems" @reachEnd="handleOnReachEnd"></video-list>
    </div>
    <div v-else class="root-init">
      <init-form
        :submitable="isMobile"
        :init-api-key="initFormObject.apiKey"
        :init-keyword="initFormObject.keyword"
        :init-remember-me="initFormObject.rememberMe"
        @submit="handleOnSubmit"
      ></init-form>
    </div>
  </div>
</template>
<script lang="ts">
import "vue-loading-overlay/dist/vue-loading.css";
import Loading from "vue-loading-overlay";
import Vue from "vue";
import VideoList from "@js/components/youtube/VideoList.vue";
import InitForm from "@js/components/youtube/InitForm.vue";
import { ApiClient } from "@js/services/youtubeDataApi/apiClient";
import { InitFormType, SearchResultItem, SearchResult } from "@js/types/youtubeApi";

interface Data {
  initFormObject: InitFormType;
  submitted: boolean;
  nextPageToken: string;
  isLoading: boolean;
  videoItems: SearchResultItem[];
}

export default Vue.extend({
  components: {
    VideoList,
    InitForm,
    Loading,
  },
  data(): Data {
    return {
      initFormObject: { apiKey: "", keyword: "", rememberMe: false },
      submitted: false,
      isLoading: false,
      nextPageToken: "",
      videoItems: [],
    };
  },
  computed: {
    client: function (): ApiClient {
      return new ApiClient(this.initFormObject.apiKey);
    },
    isPlayable: function (): boolean {
      return !!this.initFormObject.apiKey && this.submitted;
    },
    isMobile: function (): boolean {
      return !!navigator.userAgent.match(/iPhone|Android|Mobile/);
    },
  },
  created: function (): void {
    const object = JSON.parse(localStorage.getItem("initForm") || "{}");
    if (object) this.initFormObject = object;
  },
  methods: {
    getSerchResult: async function (): Promise<void> {
      try {
        this.isLoading = true;
        const ret: SearchResult = await this.client.search(this.initFormObject.keyword, this.nextPageToken);
        if (ret.nextPageToken) this.nextPageToken = ret.nextPageToken;
        this.videoItems.push(...ret.items);
      } finally {
        this.isLoading = false;
      }
    },
    handleOnReachEnd: async function (): Promise<void> {
      await this.getSerchResult();
    },
    handleOnSubmit: async function (object: InitFormType): Promise<void> {
      this.initFormObject = object;
      this.submitted = true;
      if (this.initFormObject.rememberMe) localStorage.setItem("initForm", JSON.stringify(object));
      await this.getSerchResult();
    },
  },
});
</script>
