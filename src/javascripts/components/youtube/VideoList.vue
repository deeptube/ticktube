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
import Vue, { PropType } from "vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.min.css";
import VideoItem from "@js/components/youtube/VideoItem.vue";
import { SearchResultItem } from "@js/types/youtubeApi";

const CURRENT_PLAYER_SELECTOR = ".swiper-slide-active .yotube-player iframe";
const PLAY_VIDEO_MESSAGE_CMD = '{"event":"command","func":"playVideo","args":""}';
const PAUSE_VIDEO_MESSAGE_CMD = '{"event":"command","func":"pauseVideo","args":""}';

interface Data {
  swiperOptions: object;
}

export default Vue.extend({
  components: {
    Swiper,
    SwiperSlide,
    VideoItem,
  },
  props: {
    videoItems: {
      type: Array as PropType<SearchResultItem[]>,
      required: true,
    },
  },
  data(): Data {
    return {
      swiperOptions: {
        height: window.innerHeight,
        direction: "vertical",
      },
    };
  },
  methods: {
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
      this.$emit("reachEnd");
    },
  },
});
</script>
<style lang="scss" scoped></style>
