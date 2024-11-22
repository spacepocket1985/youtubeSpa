export const BaseEndpoint =
  'https://www.googleapis.com/youtube/v3/search?part=snippet';
export const StatEndpoint = 'https://www.googleapis.com/youtube/v3/videos';

export const BaseMaxResults = '12';
export enum SortOrder {
  Date = 'date',
  Rating = 'rating',
  Relevance = 'relevance',
  Title = 'title',
  VideoCount = 'videoCount',
  ViewCount = 'viewCount',
}

type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

type Snippet = {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: Thumbnail;
    medium?: Thumbnail;
    high?: Thumbnail;
    [key: string]: Thumbnail | undefined;
  };
  channelTitle: string;
  liveBroadcastContent: string;
};

type VideoId = {
  kind: string;
  videoId?: string;
  channelId?: string;
  playlistId?: string;
};

type VideoStatistics = {
  viewCount: string;
  likeCount?: string;
  dislikeCount?: string;
  commentCount?: string;
};

export type VideoItem = {
  kind: string;
  etag: string;
  id: VideoId;
  snippet: Snippet;
  statistics?: VideoStatistics;
};

export type SearchInfo = { totalResults: number; resultsPerPage: number };

export type YouTubeSearchResponse = {
  items: VideoItem[];
  pageInfo: SearchInfo;
};

export type VideoStatisticsResponse = {
  kind: string;
  etag: string;
  items: {
    kind: string;
    etag: string;
    id: string;
    statistics: {
      viewCount: string;
      likeCount?: string;
      dislikeCount?: string;
      commentCount?: string;
    };
  }[];
};

export type VideoStatisticsItem = {
  id: string;
  statistics: {
    viewCount: string;
    likeCount?: string;
    dislikeCount?: string;
    commentCount?: string;
  };
};
