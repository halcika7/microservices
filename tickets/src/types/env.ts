interface ENV {
  env: 'development' | 'test' | 'staging' | 'production';
}

export const env = {
  env: process.env.NODE_ENV,
} as ENV;
