import { GHIBLI_API_BASE_URL } from "../constants";

export type Film = {
  id: string;
  title: string;
  original_title: string;
  original_title_romanised: string;
  image: string;
  movie_banner: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  running_time: string;
  rt_score: string;
  people: string[];
  species: string[];
  locations: string[];
  vehicles: string[];
  url: string;
};

export type Person = {
  id: string;
  name: string;
  gender: string;
  age: string;
  eye_color: string;
  hair_color: string;
  films: string[];
  species: string;
  url: string;
};

export type Location = {
  id: string;
  name: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: string[];
  films: string[];
  url: string;
};

export type Species = {
  id: string;
  name: string;
  classification: string;
  eye_colors: string;
  hair_colors: string;
  people: string[];
  films: string[];
  url: string;
};

export type Vehicle = {
  id: string;
  name: string;
  description: string;
  vehicle_class: string;
  length: string;
  pilot: string;
  films: string[];
  url: string;
};

export const getFilms = (): Promise<Film[]> => {
  return fetch(`${GHIBLI_API_BASE_URL}/films`).then((response) => response.json());
};

export const getFilmById = (id: string): Promise<Film> => {
  return fetch(`${GHIBLI_API_BASE_URL}/films/${id}`).then((response) => response.json());
};

export const getPeople = (): Promise<Person[]> => {
  return fetch(`${GHIBLI_API_BASE_URL}/people`).then((response) => response.json());
};

export const getPersonById = (id: string): Promise<Person> => {
  return fetch(`${GHIBLI_API_BASE_URL}/people/${id}`).then((response) => response.json());
};

export const getLocations = (): Promise<Location[]> => {
  return fetch(`${GHIBLI_API_BASE_URL}/locations`).then((response) => response.json());
};

export const getLocationById = (id: string): Promise<Location> => {
  return fetch(`${GHIBLI_API_BASE_URL}/locations/${id}`).then((response) => response.json());
};

export const getSpecies = (): Promise<Species[]> => {
  return fetch(`${GHIBLI_API_BASE_URL}/species`).then((response) => response.json());
};

export const getSpeciesById = (id: string): Promise<Species> => {
  return fetch(`${GHIBLI_API_BASE_URL}/species/${id}`).then((response) => response.json());
};

export const getVehicles = (): Promise<Vehicle[]> => {
  return fetch(`${GHIBLI_API_BASE_URL}/vehicles`).then((response) => response.json());
};

export const getVehicleById = (id: string): Promise<Vehicle> => {
  return fetch(`${GHIBLI_API_BASE_URL}/vehicles/${id}`).then((response) => response.json());
};
