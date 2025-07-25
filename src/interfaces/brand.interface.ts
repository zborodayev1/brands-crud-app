export interface Brand {
  _id: string;
  name: string;
  description: string;
  logoUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface brandPayload {
  name: string;
  description: string;
  logoUrl: string;
}
