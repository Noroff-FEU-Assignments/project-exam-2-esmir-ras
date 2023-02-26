import { Button, Collapse, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { Comment } from 'types';
import { isoToLocaleDateString } from 'utils';
import { Form } from 'components';
import { AuthContext } from 'context/AuthContext';
import { saveComment } from 'api';
import { useRouter } from 'next/router';

interface Props extends Comment {
  level?: number;
}

export function RenderComment({
  body,
  created,
  id,
  owner,
  level,
  postId,
}: Props) {
  const [open, setOpen] = useState(false);
  const { authHeader } = useContext(AuthContext);
  const router = useRouter();

  const clickHandler = () => {
    setOpen((prev) => !prev);
  };

  const submitHandler = async (values: any) => {
    if (!authHeader) return null;
    const reqBody = {
      body: values.comm,
      replyToId: id,
    };
    await saveComment(reqBody, postId.toString(), authHeader);
    router.reload();
  };

  return (
    <div
      className="shadow-md shadow-neutral-500 rounded-md p-2"
      style={{
        transform: level ? `translateX(${level * 25}px)` : undefined,
        width: level ? `calc(100% - ${level * 25}px` : undefined,
        background:'#13111A', borderRadius:'15px', 
      }}
    >
      <div className="cursor-pointer p-2" onClick={clickHandler}>
        <div className="mb-4">
          <p>{body}</p>
        </div>
        <div className="flex gap-2 text-sm" style={{color:'#fff'}}>
          Posted by <span style={{color:'#BD4D75'}}>{owner}</span> on <span>{isoToLocaleDateString(created)}</span>
        </div>
      </div>
      <Collapse in={open}>
        <Form
          onSubmit={submitHandler}
          className="my-4 bg-indigo-100 rounded-md p-4"
          style={{background:'#1D1A27'}}
        >
          <h4 className="m-0" hidden>Add a comment</h4>
          <TextField
            name="comm"
            fullWidth
            rows={3}
            multiline
            className="bg-indigo-50 mb-4"
            placeholder='Type anything...'
            style={{background:'#1D1A27'}}
          />
          <Button variant="contained" color="primary" type="submit" style={{width:'100%', background:'linear-gradient(to right, #BD4D75, #6861DE)'}}>
            Post a comment
          </Button>
        </Form>
      </Collapse>
    </div>
  );
}
