import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { buildClient } from '../../lib/axios';

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

const SignIn: NextPage = () => {
  const axios = buildClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<Form>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Form> = async signData => {
    clearErrors();
    const { data } = await axios.post<{
      errors?: Record<'email' | 'password', string>;
    }>('/users/v1/sign-in', signData);

    if (data.errors) {
      Object.entries(data.errors).forEach(([key, value]) => {
        setError(key as keyof Form, { message: value });
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign In</h1>
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
