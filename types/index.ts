export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  media: string;
  created: string;
  updated: string;
  author: {
    name: string;
    email: string;
    avatar: string;
    banner: string;
  };
  _count: {
    comments: number;
    reactions: number;
  };
  comments?: Comment[];
  reactions?: Reaction[];
}

export interface Comment {
  body: string;
  replyToId: number | null;
  id: number;
  postId: number;
  owner: string;
  created: string;
  author: Profile;
}

export interface Reaction {
  symbol: string;
  count: number;
  postId: number;
}

export interface Profile {
  name: string;
  email: string;
  banner: string | null;
  avatar: string | null;
  followers?: PrivateProfile[];
  following?: PrivateProfile[];
  _count: {
    posts: number;
    followers: number;
    following: number;
  };
}

export interface PrivateProfile {
  name: string;
  avatar: string;
}
