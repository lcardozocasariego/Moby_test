export interface Iauth {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  address?: Address;
  phone?: string;
  website?: string;
  company?: Company;
}

export interface Address {
  street?: string;
  suite?: string;
  city?: string;
  zipcode?: string;
  geo?: Geo;
}

export interface Company {
  name?: string;
  catchPhrase?: string;
  bs?: string;
}




export interface User {
  id?: string;
  fullName: string;
  userName: string;
  email: string;
  role: string;
  photo: string;
  birthDate: string;
  ubication: Geo;
}

export interface EditUser {
  ubication: Geo;
  photo: string;
  userName: string;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface ShortUser {
  id?: string;
  userName: string;
  photo: string;
}
