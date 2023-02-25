import { Button, TextField } from '@mui/material';
import { deletePost, updatePost } from 'api';
import { Form } from 'components';
import { AuthContext } from 'context/AuthContext';
import { useRouter } from 'next/router';
import { useContext } from 'react';

interface Props {
  id: number;
}

export function DeletePost({ id }: Props) {
  const { authHeader } = useContext(AuthContext);
  const router = useRouter();

  const clickHandler = async () => {
    if (!authHeader) return;
    await deletePost(id, authHeader);
    router.push('/home');
  };

  return (
    <div className="flex flex-col items-center gap-8 p-2 md:p-4" style={{color:'#fff'}}>
      <h1>Delete post</h1>
      <p>Are you sure you want to delete this post?</p>
      <Button variant="contained" color="error" onClick={clickHandler} style={{background:'linear-gradient(to right, #BD4D75, #6861DE)', color:'#fff'}}>
        Delete post
      </Button>
    </div>
  );
}
