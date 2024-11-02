export const _BaseEndpoint =
  'https://www.googleapis.com/youtube/v3/search?part=snippet';

export const _BaseMaxResults = '12';

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

export type VideoItem = {
  kind: string;
  etag: string;
  id: VideoId;
  snippet: Snippet;
};

export type YouTubeSearchResponse = {
  items: VideoItem[];
};
