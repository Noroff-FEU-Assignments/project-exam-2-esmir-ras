import { Button, TextField } from '@mui/material';
import { updatePost } from 'api';
import { Form } from 'components';
import { AuthContext } from 'context/AuthContext';
import { useRouter } from 'next/router';
import { useContext } from 'react';

interface Props {
  id: number;
  title?: string;
  media?: string;
  tags?: string[];
  body?: string;
}

export function EditPost({ id, title, media, tags, body }: Props) {
  const { authHeader } = useContext(AuthContext);
  const router = useRouter();

  const submitHandler = async (values: any) => {
    if (!authHeader) return;
    const tags = values.tags?.split(' ');
    const body = {
      title: values.title,
      body: values.body,
      media: values.media,
      tags,
    };
    await updatePost(body, id, authHeader);
    router.reload();
  };

  return (
    <Form
      onSubmit={submitHandler}
      className="flex flex-col items-stretch gap-8 p-2 md:p-4"
    >
      <h1 className='text-center text-white'>Edit post</h1>
      <TextField label="Title" name="title" defaultValue={title}  
                  InputProps={{
                    style:{color:'white'}
                  }} 
                  InputLabelProps={{style:{color:'white'}}}/>
      <TextField
        label="Content"
        name="body"
        multiline
        rows={5}
        defaultValue={body}
        InputProps={{
          style:{color:'white'}
        }} 
        InputLabelProps={{style:{color:'white'}}}
      />
      <TextField label="Media" name="media" defaultValue={media}  
                  InputProps={{
                    style:{color:'white'}
                  }} InputLabelProps={{style:{color:'white'}}}/>
      <TextField
        label="Tags (comma separated)"
        name="tags"
        defaultValue={tags?.join(' ')}
        InputProps={{
          style:{color:'white'}
        }} 
        InputLabelProps={{style:{color:'white'}}}
      />
      <Button variant="contained" type="submit" style={{background:'linear-gradient(to right, rgb(189, 77, 117), rgb(104, 97, 222))'}}>
        Submit post
      </Button>
    </Form>
  );
}
