declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      JWT_SECRET: string;
      MINIO_ROOT_USER: string;
      MINIO_ROOT_PASSWORD: string;
      MINIO_ROOT_ENDPOINT: string;
      MINIO_ROOT_PORT: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
    }
  }
}

export {};
