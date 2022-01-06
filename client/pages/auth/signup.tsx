import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AxiosError } from 'axios';

import { buildClient } from '../../lib/base_axios';

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
  type: string;
  message: string;
  errors?: Record<string, string>;
}

const SignUp: NextPage = () => {
  const axios = buildClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<Form>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Form> = async signupData => {
    clearErrors();
    try {
      await axios.post<{
        errors?: Record<'email' | 'password', string>;
      }>('/users/v1/sign-up', signupData);
      router.push('/auth/signin');
    } catch (err) {
      const error = err as AxiosError;
      const server = error.response?.data as ErrorResponse;
      if (server.errors) {
        Object.entries(server.errors).forEach(([key, value]) => {
          setError(key as keyof Form, { message: value });
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign Up</h1>
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
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;
