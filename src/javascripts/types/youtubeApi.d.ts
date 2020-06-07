export interface InitFormType {
  apiKey: string;
  keyword: string;
  rememberMe: boolean;
}

export interface SearchResult {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: object;
  items: SearchResultItem[];
}

export interface SearchResultItem {
  kind: string;
  etag: string;
  id: SearchResultItemId;
  snippet: SearchResultItemSnippet;
}

export interface SearchResultItemId {
  kind: string;
  videoId: string;
}

export interface SearchResultItemSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: object;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}
