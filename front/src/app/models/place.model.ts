export interface User {
  _id: string,
  displayName: string,
}

export interface Image {
  _id: string,
  filename: string
}

export interface Review {
  _id: string,
  user: User,
  description: string,
  foodRate: number,
  serviceRate: number,
  interiorRate: number,
  datetime: Date
}

export interface Place {
  _id: string,
  title: string,
  description?: string,
  user: User,
  mainImage?: string,
  averageRate: number,
  foodRate: number,
  serviceRate: number,
  interiorRate: number,
  images: Image[],
  reviews: Review[],
}

export interface PlaceData {
  [key: string]: any,

  title: string,
  description?: string,
  mainImage: File,
}
