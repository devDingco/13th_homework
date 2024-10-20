export interface ICharacter {
  _id: number;
  name: string;
  films: string[];
  imageUrl: string;
  tvShows?: string[];
  videoGames?: string[];
  allies?: string[];
  enemies?: string[];
}
