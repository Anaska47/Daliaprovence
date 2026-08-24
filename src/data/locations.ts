import rawLocations from './locations.json';

export interface LocationData {
  slug: string;
  name: string;
  zipCode: string;
  description: string;
}

export const locations: LocationData[] = rawLocations as LocationData[];

export const getLocationBySlug = (slug: string) => {
  return locations.find(loc => loc.slug === slug.toLowerCase()) || null;
};
