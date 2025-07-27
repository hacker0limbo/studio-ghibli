import { type Film, type Location, type Person, type Species, type Vehicle } from "@/api";
import { create, type StateCreator } from "zustand";

type FilmStore = {
  films: Film[];
  setFilms: (films: Film[]) => void;
};

type PeopleStore = {
  people: Person[];
  setPeople: (people: Person[]) => void;
};

type LocationStore = {
  locations: Location[];
  setLocations: (locations: Location[]) => void;
};

type SpeciesStore = {
  species: Species[];
  setSpecies: (species: Species[]) => void;
};

type VehicleStore = {
  vehicles: Vehicle[];
  setVehicles: (vehicles: Vehicle[]) => void;
};

const createFilmStore: StateCreator<FilmStore, [], [], FilmStore> = (set) => ({
  films: [],
  setFilms: (films) => set({ films }),
});

const createPeopleStore: StateCreator<PeopleStore, [], [], PeopleStore> = (set) => ({
  people: [],
  setPeople: (people) => set({ people }),
});

const createLocationStore: StateCreator<LocationStore, [], [], LocationStore> = (set) => ({
  locations: [],
  setLocations: (locations) => set({ locations }),
});

const createSpeciesStore: StateCreator<SpeciesStore, [], [], SpeciesStore> = (set) => ({
  species: [],
  setSpecies: (species) => set({ species }),
});

const createVehicleStore: StateCreator<VehicleStore, [], [], VehicleStore> = (set) => ({
  vehicles: [],
  setVehicles: (vehicles) => set({ vehicles }),
});

export const useStore = create<
  FilmStore & PeopleStore & LocationStore & SpeciesStore & VehicleStore
>()((...a) => ({
  ...createFilmStore(...a),
  ...createPeopleStore(...a),
  ...createLocationStore(...a),
  ...createSpeciesStore(...a),
  ...createVehicleStore(...a),
}));
