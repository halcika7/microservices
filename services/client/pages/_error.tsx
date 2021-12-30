import React from 'react';
import { NextPage } from 'next';

interface ErrorI {
  statusCode?: number;
}

const Error: NextPage<ErrorI> = ({ statusCode }) => {
  return (
    <>
      {/* <HeadLayout title="Error Page" description="desc" path="404" />
      <NotFound
        code={statusCode}
        type={
          statusCode
            ? 'An error occured on server'
            : 'An error occured on client'
        }
      /> */}
      <h1>Not found {statusCode}</h1>
    </>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res && res.statusCode && err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
