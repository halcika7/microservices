import 'bootstrap/dist/css/bootstrap.css';
import type { AppProps, AppContext } from 'next/app';
import { useRouter } from 'next/router';
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import NProgress from 'nprogress';
import '../public/nprogress.css';
import { DefaultSeo } from 'next-seo';
import ServerCookie from 'next-cookies';

import axios, { buildClient } from '../lib/base_axios';
import { AuthToken, DecodedToken } from '../lib/decode';
import { AuthContext } from '../context/auth';
import Header from '../components/Header';

const rejectPromise = (error: unknown) => Promise.reject(error);

const getDecoded = (token: string) => {
  return new AuthToken(token).decodedToken;
};

type UserType = DecodedToken | Record<string, unknown>;

const signOut = async (setUser: Dispatch<SetStateAction<UserType>>) => {
  await axios.post('/users/v1/sign-out');
  setUser({});
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  buildClient();
  const [user, setUser] = useState<UserType>(pageProps.user ?? {});
  console.log('🚀 ~ file: _app.tsx ~ line 38 ~ MyApp ~ user', user);
  const [state, setState] = useState({
    user,
    setUser,
  });

  const signOutOnClick = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    await signOut(setUser);
    router.push('/auth/signin');
  };

  useEffect(() => {
    axios.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        const { status } = error.response;
        const refreshUrl = `${axios.defaults.baseURL}/users/v1/refresh`;

        if (status === 401 && originalRequest.url === refreshUrl) {
          await signOut(setUser);
          return rejectPromise(error);
        }

        if (status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const { data } = await axios.get('/users/v1/refresh');
            setUser(getDecoded(data.result));
            return axios(originalRequest);
          } catch (err) {
            await signOut(setUser);
            return rejectPromise(err);
          }
        }

        return rejectPromise(error);
      }
    );
  }, []);

  useEffect(() => {
    const refresh = async () => {
      try {
        const { data } = await axios.get('/users/v1/refresh?firstCheck=true');
        setUser(getDecoded(data.result));
      } catch (error) {
        await signOut(setUser);
      }
    };
    refresh();
  }, []);

  useEffect(() => {
    const handleStart = () => NProgress.start();

    const handleStop = () => NProgress.done();

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router.events]);

  useEffect(() => {
    setState(prev => ({ ...prev, user }));
  }, [user]);

  return (
    <>
      <DefaultSeo
        openGraph={{ type: 'website', locale: 'en_IE', site_name: 'SiteName' }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <AuthContext.Provider value={state}>
        <Header onSignOut={signOutOnClick} />
        <Component {...pageProps} />
      </AuthContext.Provider>
    </>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  const pageProps = (
    Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
  ) as Record<string, unknown>;
  const token = ServerCookie(ctx)[process.env.cookie_access_name as string];
  console.log(
    '🚀 ~ file: _app.tsx ~ line 127 ~ MyApp.getInitialProps= ~ token',
    token
  );

  if (token) {
    pageProps.user = getDecoded(token);
  }

  return { pageProps };
};

export default MyApp;
