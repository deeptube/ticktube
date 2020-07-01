<template>
  <div class="init-form">
    <h1>TickTube</h1>
    <div class="init-form-info">
      YouTube動画をスワイプして閲覧できるViewerです。<br />
      YouTube Data API KEYと検索するKeyword(任意)を入力して、ご利用ください。<br />
      モバイルにしか対応していません🙇‍♂️
    </div>
    <form>
      <div class="init-form-item">
        <p class="init-form-item-label">
          YouTube Data API KEY
        </p>
        <input v-model="apiKey" class="full" type="text" name="apiKey" />
      </div>
      <div class="init-form-item">
        <p class="init-form-item-label">
          Keyword
        </p>
        <input v-model="keyword" class="full" type="text" name="keyword" />
      </div>
      <div class="init-form-item">
        <input v-model="rememberMe" type="checkbox" name="rememberMe" />
        入力内容をブラウザに保存する
      </div>
      <div class="init-form-item submit">
        <button :disabled="!submitable" @click="submit">
          スワイプで見る🚀
        </button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { InitFormType } from "@js/types/youtubeApi";

export default Vue.extend({
  props: {
    initApiKey: {
      type: String,
      default: "",
    },
    initKeyword: {
      type: String,
      default: "",
    },
    initRememberMe: {
      type: Boolean,
      default: false,
    },
    submitable: {
      type: Boolean,
      required: true,
    },
  },
  data(): InitFormType {
    return {
      apiKey: this.initApiKey,
      keyword: this.initKeyword,
      rememberMe: this.initRememberMe,
    };
  },
  computed: {
    isValid: function (): boolean {
      return !!this.apiKey;
    },
  },
  methods: {
    submit: function (): void {
      this.$emit("submit", {
        apiKey: this.apiKey,
        keyword: this.keyword,
        rememberMe: this.rememberMe,
      } as InitFormType);
    },
  },
});
</script>
<style lang="scss" scoped>
.init-form {
  margin: 1em;
  text-align: center;

  .init-form-info {
    border: 2px solid gray;
    padding: 0.5em;
    border-radius: 0.5em;
    color: white;
  }
  .init-form-item {
    margin-top: 0.8em;
    margin-bottom: 0.8em;

    .init-form-item-label {
      margin-top: 0em;
      margin-bottom: 0em;
    }

    input {
      border: none;
      border-radius: 0.2em;
      height: 2em;
      vertical-align: top;

      &.full {
        width: 100%;
      }
    }

    &.submit {
      margin-top: 2em;

      button {
        color: white;
        border: none;
        border-radius: 0.2em;
        padding: 0.5em;
        width: 100%;
        font-size: 1.2em;
        background-color: gray;
      }
    }
  }
}
</style>
