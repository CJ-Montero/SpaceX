export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  details?: string;
  success?: boolean;
  links?: {
    patch?: {
      small?: string;
    };
    webcast?: string;
  };
  crew?: string[];
}

export interface Rocket {
  id: string;
  name: string;
  description: string;
  height: { meters: number };
  diameter: { meters: number };
  mass: { kg: number };
  images?: string[];
}
