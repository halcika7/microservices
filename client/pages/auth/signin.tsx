import { useContext, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AxiosError } from 'axios';

import { buildClient } from '../../lib/base_axios';
import { AuthContext } from '../../context/auth';
import { AuthToken } from '../../lib/decode';

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

interface Form {
  email: string;
  password: string;
}

interface ErrorResponse {
  message: string;
  type: string;
  errors?: Record<string, string>;
}

const SignIn: NextPage = () => {
  const axios = buildClient();
  const router = useRouter();
  const [message, setMessage] = useState<string>('');
  const { setUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Form> = async signData => {
    setMessage('');
    try {
      const { data } = await axios.post('/users/v1/sign-in', signData);
      setUser(new AuthToken(data.result).decodedToken);
      router.replace('/');
    } catch (err) {
      const error = err as AxiosError;
      const server = error.response?.data as ErrorResponse;
      setMessage(server.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign In</h1>
      {message && <p>{message}</p>}
      <div className="form-group">
        <label htmlFor="email">
          <input type="email" {...register('email')} />
          Email Address
        </label>
        <p>{errors.email?.message}</p>
      </div>
      <div className="form-group">
        <label htmlFor="password">
          <input type="password" {...register('password')} />
          Password
        </label>
        <p>{errors.password?.message}</p>
      </div>
      <button type="submit" className="btn btn-primary">
        Sign In
      </button>
    </form>
  );
};

export default SignIn;
