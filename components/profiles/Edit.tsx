import { Button, TextField } from '@mui/material';
import { updateProfileMedia } from 'api';
import { Form } from 'components';
import { AuthContext } from 'context/AuthContext';
import { useRouter } from 'next/router';
import { useContext } from 'react';

interface Props {
  name: string;
  banner: string | null;
  avatar: string | null;
}

export function EditProfile({ name, banner, avatar }: Props) {
  const { authHeader } = useContext(AuthContext);
  const router = useRouter();

  const submitHandler = async (values: any) => {
    if (!authHeader) return;
    const body = {
      banner: values.banner,
      avatar: values.avatar,
    };
    await updateProfileMedia(body, name, authHeader);
    router.reload();
  };

  return (
    <Form
      onSubmit={submitHandler}
      className="flex flex-col items-stretch gap-8 p-2 md:p-4"
      style={{background:'#1D1A27', color:'#fff'}}
    >
      <h1 className='text-center'>Edit profile media</h1>
      <TextField label="Banner" name="banner" defaultValue={banner} InputProps={{
                    style:{color:'white'}
                  }} InputLabelProps={{style:{color:'white'}}}/>
      <TextField label="Avatar" name="avatar" defaultValue={avatar} InputProps={{
                    style:{color:'white'}
                  }} InputLabelProps={{style:{color:'white'}}}/>
      <Button variant="contained" type="submit" style={{background:'linear-gradient(to right, #BD4D75, #6861DE)'}}>
        Update media
      </Button>
    </Form>
  );
}
