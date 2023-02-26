import { Button, TextField } from '@mui/material';
import { savePost } from 'api';
import { Form } from 'components';
import { AuthContext } from 'context/AuthContext';
import { useRouter } from 'next/router';
import { useContext } from 'react';

export function CreatePost() {
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
    await savePost(body, authHeader);
    router.reload();
  };

  return (
    <Form
      onSubmit={submitHandler}
      className="flex flex-col items-stretch gap-8 p-2 md:p-4"
      style={{background:'#1D1A27'}}
    >
      <h1 className='text-center text-white'>Create post</h1>
      <TextField label="Title" name="title"  
                  InputProps={{
                    style:{color:'white'}
                  }} 
                  InputLabelProps={{style:{color:'white'}}}/>
      <TextField label="Content" name="body" multiline rows={5} InputProps={{
                    style:{color:'white'}
                  }} 
                  InputLabelProps={{style:{color:'white'}}}/>
      <TextField label="Media" name="media" InputProps={{
                    style:{color:'white'}
                  }} 
                  InputLabelProps={{style:{color:'white'}}}/>
      <TextField label="Tags (comma separated)" name="tags" InputProps={{
                    style:{color:'white'}
                  }} 
                  InputLabelProps={{style:{color:'white'}}}/>
      <Button variant="contained" type="submit" style={{background:'linear-gradient(to right, rgb(189, 77, 117), rgb(104, 97, 222))'}}>
        Submit post
      </Button>
    </Form>
  );
}
