<template>
  <div class="video-item">
    <div class="video-item-player">
      <player :video-id="videoItem.id.videoId" />
    </div>
    <div class="video-item-info">
      <h2 class="video-item-channel">
        {{ "@" + videoItem.snippet.channelTitle }}
      </h2>
      <h2 class="video-item-title">
        {{ videoItem.snippet.title }}
      </h2>
      <p class="video-item-description">
        {{ videoItem.snippet.description }}
      </p>
      <section class="video-item-share">
        <h3>この動画を共有する</h3>
        <a class="video-item-share-url" :href="`https://youtu.be/${videoItem.id.videoId}`">
          {{ `https://youtu.be/${videoItem.id.videoId}` }}
        </a>
        <div class="video-item-share-buttons">
          <a :href="twitterShareLink(videoItem)" class="video-item-share-button" target="_blank">
            <font-awesome-icon :icon="['fab', 'twitter-square']" />
          </a>
          <a :href="faceBookShareLink(videoItem)" class="video-item-share-button" target="_blank">
            <font-awesome-icon :icon="['fab', 'facebook-square']" />
          </a>
          <a class="video-item-share-button" @click="copyVideoUrl('.video-item-share-url')">
            <font-awesome-icon :icon="['fas', 'copy']" />
          </a>
        </div>
      </section>
      <div class="video-item-next-video-msg">
        <p>
          スワイプして次の動画を見る
          <font-awesome-icon :icon="['fas', 'chevron-circle-down']" />
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import Player from "@js/components/youtube/Player.vue";
import { SearchResultItem } from "@js/types/youtubeApi";

export default Vue.extend({
  components: {
    Player,
  },
  props: {
    videoItem: {
      type: Object as PropType<SearchResultItem>,
      required: true,
    },
  },
  methods: {
    twitterShareLink: function (videoItem: SearchResultItem) {
      const rootUrl = "https://twitter.com/intent/tweet";
      const url = `https%3A//youtu.be/${videoItem.id.videoId}`;
      const via = "via=YouTube&related=YouTube,YouTubeTrends,YTCreators";
      return `${rootUrl}?url=${url}&text=${videoItem.snippet.title}&${via}`;
    },
    faceBookShareLink: function (videoItem: SearchResultItem) {
      const rootUrl = "https://www.facebook.com/dialog/share";
      const href = `https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${videoItem.id.videoId}%26feature%3Dshare`;
      return `${rootUrl}?app_id=87741124305&href=${href}&display=popup`;
    },
    copyVideoUrl: async function (selector: string) {
      const target = this.$el.querySelector(`.swiper-slide-active ${selector}`);
      if (!target?.textContent) return;
      await navigator.clipboard.writeText(target.textContent);
      alert(`「${target.textContent}」をコピーしました！`);
    },
  },
});
</script>
<style lang="scss" scoped>
.video-item {
  color: #ffffff;
  .video-item-info {
    margin: 0.5em;

    .video-item-channel {
      font-size: 0.8em;
    }

    .video-item-title {
      font-size: 0.8em;
      font-weight: bold;
    }

    .video-item-description {
      font-size: 0.8em;
    }

    .video-item-share {
      border-top: 1px solid #ffffff;
      text-align: center;

      h3 {
        margin: 0.2em;
        font-size: 1em;
      }

      a:link {
        color: #ffffff;
      }
      a:visited {
        color: #ffffff;
      }
      a:hover {
        color: #ffffff;
      }
      a:active {
        color: #ffffff;
      }
      .video-item-share-url {
        font-size: 0.8em;
      }

      .video-item-share-buttons {
        font-size: 1.8em;

        .video-item-share-button {
          display: inline-block;
          margin: 0em 1em;
        }
      }
    }

    .video-item-next-video-msg {
      border-top: 1px solid #ffffff;
      text-align: center;
      font-size: 1em;
    }
  }
}
</style>
