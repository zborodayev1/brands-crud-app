export interface Brand {
  _id: string;
  name: string;
  description: string;
  logoUrl: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface brandPayload {
  name: string;
  description: string;
  logoUrl: string;
}
