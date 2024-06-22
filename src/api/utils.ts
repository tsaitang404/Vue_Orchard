export const baseUrlApi = (url: string) =>
  process.env.NODE_ENV === "development"
    ? `http://127.0.0.1:9090/${url}`
    : `/api/${url}`;
export type BaseResult = {
  code: boolean;
  message: string;
  data: any;
};
