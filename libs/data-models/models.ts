export interface LoginResponse {
  token: string;
  expires: Date | null;
}
export interface LoginRequest {
  username: string;
  password: string;
}

export interface ServiceError {
  errMsg: string;
  status: string;
}
