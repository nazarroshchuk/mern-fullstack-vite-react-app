export interface PlaceType {
  id: string;
  title: string;
  description: string;
  address: string;
  image: string;
  creator: string | null;
}

export interface UserType {
  id: string;
  name: string;
  email?: string;
  image?: string;
  places: string[];
}
