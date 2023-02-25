import Head from 'next/head';
import Image from 'next/image';
import { Form } from 'components';
import { Alert, Button, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { login, register } from 'api';
import { useRouter } from 'next/router';
import { AuthContext } from 'context/AuthContext';

export default function Home() {
  const [signUp, setSignUp] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    pass_conf: '',
  });
  const [authError, setAuthError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/home');
  }, [user]);

  const clickSignupHandler = () => {
    setSignUp((prev) => !prev);
  };

  const submitHandler = async (values: any) => {
    let errored = false;
    if (!values.name || !/^[A-Za-z0-9_]*$/.test(values.name)) {
      setErrors((prev) => ({ ...prev, name: 'A valid name must be provided' }));
      if (signUp) errored = true;
    } else {
      setErrors((prev) => ({ ...prev, name: '' }));
    }
    if (!values.email || !values.email.includes('stud.noroff.no')) {
      setErrors((prev) => ({
        ...prev,
        email: 'A valid email must be provided',
      }));
      errored = true;
    } else {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
    if (!values.password || values.password.length < 8) {
      console.log('hey');
      setErrors((prev) => ({
        ...prev,
        password: 'A valid password of at least 8 characters must be provided',
      }));
      errored = true;
    } else {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
    if (!values.pass_conf || values.pass_conf !== values.password) {
      setErrors((prev) => ({ ...prev, pass_conf: 'Passwords do not match' }));
      if (signUp) errored = true;
    } else {
      setErrors((prev) => ({ ...prev, pass_conf: '' }));
    }
    if (errored) return;
    try {
      if (signUp) {
        await register(values);
        setSignUpSuccess(true);
        setSignUp(false);
        setAuthError('');
      } else {
        await login(values);
        setAuthError('');
        location.reload();
      }
    } catch (e: any) {
      if (typeof e !== 'string') return;
      setAuthError(e);
    }
  };

  return (
    <>
      <Head>
        <title>React App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen flex flex-col gap-20 items-center justify-center bg-main" style={{background: '#13111A'}}>
        <div className="max-w-4xl w-11/12 mx-auto" style={{width:'35vw', background:'#1D1A27', height:'fit-content', color:'#fff', borderRadius:'2rem', marginTop:'4rem', padding:'1rem'}}>
          <div className="mb-4 md:mb-8 max-w-fit mx-auto">
            {signUpSuccess && (
              <Alert severity="success" variant="filled">
                Signed up successfully! Please login
              </Alert>
            )}
            {authError.length > 0 && (
              <Alert severity="error" variant="filled">
                {authError}
              </Alert>
            )}
          </div>
          <div className="flex flex-col-reverse md:flex-row gap-8 items-center justify-around">
            <div className="flex flex-col gap-4" style={{display:'none'}}>
              <h1>Join to enjoy!</h1>
              <div className="flex flex-col items-center gap-2 text-xs">
                <p>
                  {signUp
                    ? 'Already have an account?'
                    : "Don't have an account?"}
                </p>
                <p
                  className="text-sky-600 hover:underline cursor-pointer"
                  onClick={clickSignupHandler}
                >
                  {signUp ? 'Login' : 'Sign up'}
                </p>
              </div>
            </div>
            <div className="w-full max-w-xs">
              <div className="text-center"><Image src="/Socialgram-2.png" alt="Logo" height={70} width={200} /></div>
              <h2 className="text-center">{signUp ? 'Sign up' : 'Login'}</h2>
              <Form
                onSubmit={submitHandler}
                className="flex flex-col gap-4 my-4"
              >
                {signUp && (
                  <TextField
                    name="name"
                    placeholder="Name"
                    helperText={errors.name ? errors.name : ' '}
                    error={!!errors.name}
                    InputProps={{
                                  style:{border:'1px solid white', color:'white', height:'2.8rem', borderRadius:'10px'}
                                }}
                  />
                )}
                <TextField
                  name="email"
                  placeholder="E-mail"
                  type="email"
                  helperText={errors.email ? errors.email : ' '}
                  error={!!errors.email}
                  InputProps={{
                    style:{border:'1px solid white', color:'white', height:'2.8rem', borderRadius:'10px'}
                  }}
                />
                <TextField
                  name="password"
                  placeholder="Password"
                  type="password"
                  helperText={errors.password ? errors.password : ' '}
                  error={!!errors.password}
                  InputProps={{
                    style:{border:'1px solid white', color:'white', height:'2.8rem', borderRadius:'10px'}
                  }}
                />
                {signUp && (
                  <TextField
                    name="pass_conf"
                    placeholder="Repeat password"
                    type="password"
                    helperText={errors.pass_conf ? errors.pass_conf : ' '}
                    error={!!errors.pass_conf}
                    InputProps={{
                      style:{border:'1px solid white', color:'white', height:'2.8rem', borderRadius:'10px'}
                    }}
                  />
                )}
                <div className="flex flex-col items-center gap-2 text-xs">
                  <p>
                    {signUp
                      ? 'Already have an account?'
                      : "Don't have an account?"}
                  </p>
                  <p
                    className="text-sky-600 hover:underline cursor-pointer"
                    onClick={clickSignupHandler}
                    style={{color:'#BD4D75'}}
                  >
                    {signUp ? 'LOGIN' : 'SIGN UP'}
                  </p>
                </div>
                <Button variant="contained" type="submit" style={{background:'linear-gradient(to right, rgb(189, 77, 117), rgb(104, 97, 222))'}}>
                  {signUp ? 'Register' : 'Go to my feed'}
                </Button>
              </Form>
              
            </div>
          </div>
        </div>
        <div />
      </main>
    </>
  );
}
