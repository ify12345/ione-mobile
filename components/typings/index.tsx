export type Player = {
  id: number;
  number: number;
  name: string;
  initials: string;
};

export type LineupData = {
  goalkeeper: Player[];
  defenders: Player[];
  midfielders: Player[];
  forwards: Player[];
};

export type Fixture = {
    id: number;
    time: string;
    teamA: string;
    teamAName: string;
    teamB: string;
    teamBName: string;
    type: string;
};
