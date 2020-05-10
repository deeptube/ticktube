import { SearchResult } from "@js/types/youtubeApi";
import searchSampleJson from "@js/services/youtubeDataApi/searchSample.json";

export class ApiClient {
  END_POINT = "https://www.googleapis.com/youtube/v3";
  apiKey: string;
  mockSerchResponse: SearchResult = searchSampleJson;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async search(keyword: string, mock = false): Promise<SearchResult> {
    if (mock) {
      return this.mockSerchResponse;
    } else {
      const endpoint = `${this.END_POINT}/search?type=video&part=snippet&q=${keyword}&key=${this.apiKey}`;
      const response: Response = await fetch(endpoint);
      const result: SearchResult = (await response.json()) as SearchResult;
      return result;
    }
  }
}
