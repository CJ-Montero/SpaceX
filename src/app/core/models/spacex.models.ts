export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  details: string | null;
  success: boolean;
  rocket: string;
  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
    webcast: string | null;
  };
}

export interface Rocket {
  id: string;
  name: string;
  description: string;
  height: { meters: number };
  diameter: { meters: number };
  mass: { kg: number };
  images: string[];
}
