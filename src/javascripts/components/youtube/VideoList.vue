<template>
  <div class="video-list">
    <swiper
      :options="swiperOptions"
      @sliderMove="handleSliderMove"
      @slideChangeTransitionEnd="slideChangeTransitionEnd"
      @reachEnd="handleReachEnd"
    >
      <swiper-slide v-for="videoItem in videoItems" :key="videoItem.id.videoId">
        <video-item :video-item="videoItem" />
      </swiper-slide>
    </swiper>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.min.css";
import VideoItem from "@js/components/youtube/VideoItem.vue";
import { SearchResult, SearchResultItem } from "@js/types/youtubeApi";
import { ApiClient } from "@js/services/youtubeDataApi/apiClient";

const CURRENT_PLAYER_SELECTOR = ".swiper-slide-active .yotube-player iframe";
const PLAY_VIDEO_MESSAGE_CMD = '{"event":"command","func":"playVideo","args":""}';
const PAUSE_VIDEO_MESSAGE_CMD = '{"event":"command","func":"pauseVideo","args":""}';

interface Data {
  client: ApiClient;
  nextPageToken: string;
  videoItems: SearchResultItem[];
  swiperOptions: object;
  keyword: string;
}

export default Vue.extend({
  components: {
    Swiper,
    SwiperSlide,
    VideoItem,
  },
  props: {},
  data(): Data {
    // APIKey等はコードに残さないようにGETパラメーターで設定する方式にしとく
    const params = new URL(document.location.href).searchParams;
    return {
      videoItems: [],
      client: new ApiClient(params.get("apiKey") || ""),
      keyword: params.get("keyword") || "",
      nextPageToken: "",
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
        },
        height: window.innerHeight,
        direction: "vertical",
      },
    };
  },
  mounted: async function (): Promise<void> {
    await this.getSerchResult();
  },
  methods: {
    getSerchResult: function (): void {
      this.client.search(this.keyword, this.nextPageToken).then((ret: SearchResult) => {
        if (ret.nextPageToken) this.nextPageToken = ret.nextPageToken;
        this.videoItems.push(...ret.items);
      });
    },
    handleSliderMove: function (): void {
      const target = this.$el.querySelector(CURRENT_PLAYER_SELECTOR);
      const playerWindow = (target as HTMLIFrameElement).contentWindow;
      playerWindow?.postMessage(PAUSE_VIDEO_MESSAGE_CMD, "*");
    },
    slideChangeTransitionEnd: function (): void {
      const target = this.$el.querySelector(CURRENT_PLAYER_SELECTOR);
      const playerWindow = (target as HTMLIFrameElement).contentWindow;
      playerWindow?.postMessage(PLAY_VIDEO_MESSAGE_CMD, "*");
    },
    handleReachEnd: function (): void {
      this.getSerchResult();
    },
  },
});
</script>
<style lang="scss" scoped></style>
