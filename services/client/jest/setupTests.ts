import { loadEnvConfig } from '@next/env';

import '@testing-library/jest-dom';

// eslint-disable-next-line no-console
loadEnvConfig(__dirname, true, { info: () => null, error: console.error });
