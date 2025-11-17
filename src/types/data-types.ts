export interface UserType {
  id: string;
  name: string;
  email?: string;
  image?: string;
  places: string[];
}

export interface PlaceType {
  id: string;
  title: string;
  description: string;
  address: string;
  image: string;
  creator: string | null;
  location: {
    lat: number;
    lng: number;
  };
}

export interface UserType {
  id: string;
  name: string;
  email?: string;
  image?: string;
  places: string[];
}
