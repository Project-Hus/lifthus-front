export interface StatusInfo {
  code: 200 | 201 | 401 | 404 | 406 | 409 | 500;
  message: string;
}
