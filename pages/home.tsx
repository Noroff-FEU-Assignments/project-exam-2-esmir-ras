import { getPosts } from 'api';
import { PostPreview } from 'components';
import { AuthContext } from 'context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { Post } from 'types';

export default function Home() {
  const { authHeader } = useContext(AuthContext);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!authHeader) {
      location.assign('/');
      return;
    }
    getPosts(authHeader).then((data) => {
      setPosts(data);
    });
  }, [authHeader]);

  return (
    <>
      {posts.map((post) => (
        <PostPreview key={`PostId:${post.id}`} {...post} />
      ))}
    </>
  );
}
