// libs/shared-models/src/lib/business.model.ts
export interface BusinessData {
  name: string;
  location: string;
  rating: number;
  reviews: number;
  headline: string;
}

export interface BusinessRequest {
  name: string;
  location: string;
}

export interface BusinessResponse {
  rating: number;
  reviews: number;
  headline: string;
}