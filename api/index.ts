import { Post, Profile } from 'types';

export const baseUrl = 'https://api.noroff.dev/api/v1';
export const localStorageTokenName = 'scg-jwt';
export const localStorageName = 'scg-name';

export const register = async (body: any) => {
  const response = await fetch(`${baseUrl}/social/auth/register`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    },
  });
  if (!response.ok) {
    const data = await response.json();
    const errors: { message: string }[] = data.errors;
    throw errors.map((err) => err.message).join('; ');
  }
};

export const login = async (body: any) => {
  const response = await fetch(`${baseUrl}/social/auth/login`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    const errors: { message: string }[] = data.errors;
    throw errors.map((err) => err.message).join('; ');
  }
  const jwt = data.accessToken;
  const name = data.name;
  localStorage.setItem(localStorageTokenName, jwt);
  localStorage.setItem(localStorageName, name);
  return data;
};

export const getPosts = async (authHeader: string): Promise<Post[]> => {
  const response = await fetch(`${baseUrl}/social/posts?_author=true`, {
    headers: {
      Authorization: authHeader,
    },
  });
  return (await response.json()) as Post[];
};

export const getPostById = async (
  id: string,
  authHeader: string
): Promise<Post> => {
  const response = await fetch(
    `${baseUrl}/social/posts/${id}?_author=true&_comments=true&_reactions=true`,
    {
      headers: {
        Authorization: authHeader,
      },
    }
  );
  if (!response.ok) throw 'Unable to retrieve post';
  return (await response.json()) as Post;
};

export const getPostsByProfileName = async (
  name: string,
  authHeader: string
) => {
  const response = await fetch(
    `${baseUrl}/social/profiles/${name}/posts?_author=true&_comments=true&_reactions=true`,
    {
      headers: {
        Authorization: authHeader,
      },
    }
  );
  if (!response.ok) throw 'Unable to retrieve post';
  return (await response.json()) as Post[];
};

export const getProfiles = async (authHeader: string): Promise<Profile[]> => {
  const response = await fetch(`${baseUrl}/social/profiles`, {
    headers: {
      Authorization: authHeader,
    },
  });
  if (!response.ok) throw 'Unable to retrieve profiles';
  return await response.json();
};

export const getProfileByName = async (
  name: string,
  authHeader: string
): Promise<Profile> => {
  const response = await fetch(
    `${baseUrl}/social/profiles/${name}?_following=true&_followers=true`,
    {
      headers: {
        Authorization: authHeader,
      },
    }
  );
  if (!response.ok) throw 'Unable to retrieve profile';
  return (await response.json()) as Profile;
};

export const updateProfileMedia = async (
  body: any,
  name: string,
  authHeader: string
) => {
  const response = await fetch(`${baseUrl}/social/profiles/${name}/media`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      Authorization: authHeader,
      'content-type': 'application/json',
    },
  });
  if (!response.ok) throw 'Unable to update media';
};

export const saveComment = async (
  body: any,
  postId: string,
  authHeader: string
): Promise<void> => {
  const response = await fetch(`${baseUrl}/social/posts/${postId}/comment`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Authorization: authHeader,
      'content-type': 'application/json',
    },
  });
  if (!response.ok) throw 'Unable to save comment';
};

export const saveReaction = async (
  postId: string,
  symbol: string,
  authHeader: string
): Promise<void> => {
  const response = await fetch(
    `${baseUrl}/social/posts/${postId}/react/${symbol}`,
    {
      headers: {
        Authorization: authHeader,
      },
      method: 'PUT',
    }
  );
  if (!response.ok) throw 'Unable to save reaction';
};

export const savePost = async (
  body: any,
  authHeader: string
): Promise<void> => {
  const response = await fetch(`${baseUrl}/social/posts`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Authorization: authHeader,
      'content-type': 'application/json',
    },
  });
  if (!response.ok) throw 'Unable to save post';
};

export const updatePost = async (
  body: any,
  id: number,
  authHeader: string
): Promise<void> => {
  const response = await fetch(`${baseUrl}/social/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      Authorization: authHeader,
      'content-type': 'application/json',
    },
  });
  if (!response.ok) throw 'Unable to update post';
};

export const deletePost = async (
  id: number,
  authHeader: string
): Promise<void> => {
  const response = await fetch(`${baseUrl}/social/posts/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: authHeader,
    },
  });
  if (!response.ok) throw 'Unable to delete post';
};

export const followProfile = async (name: string, authHeader: string) => {
  const response = await fetch(`${baseUrl}/social/profiles/${name}/follow`, {
    method: 'PUT',
    headers: {
      Authorization: authHeader,
    },
  });
  if (!response.ok) throw 'Unable to follow this profile';
};

export const unfollowProfile = async (name: string, authHeader: string) => {
  const response = await fetch(`${baseUrl}/social/profiles/${name}/unfollow`, {
    method: 'PUT',
    headers: {
      Authorization: authHeader,
    },
  });
  if (!response.ok) throw 'Unable to unfollow this profile';
};
