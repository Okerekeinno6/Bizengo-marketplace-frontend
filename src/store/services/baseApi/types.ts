export interface IFetchApiResponse {
  json: Promise<VoidFunction>;
  status: number; // 200
  ok: boolean;

}