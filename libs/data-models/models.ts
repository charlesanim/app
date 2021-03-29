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
/**
 * Interface for the 'Home' data
 */

export interface SearchResponse {
  gameId: number;
  title: string;
  platform: string;
}

export interface Platforms {
  name: string;
  platformId: number | null;
}
export interface SearchRequest {
  gameName: string;
  platformId: number | null;
}

export interface GameDetails {
  gameId: number | null;
  title: string;
  overview: string;
  releaseDate: Date | null;
  genres: string[];
  publishers: string[];
  platform: Platforms[];
  imageUrl: string | null;
}

export interface Collection {
  imageUrl: string | null;
  gameId: number | null;
  title: string;
  platform: string;
}
