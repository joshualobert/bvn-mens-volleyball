// All team information lives here. Every entry is sourced; see the comment
// above each block. Update this file to change the roster, schedule or results.

export const team = {
  name: "Blue Valley North Men's Volleyball",
  shortName: 'BVN Volleyball',
  mascot: 'Mustangs',
  city: 'Overland Park, Kansas',
  instagram: 'https://www.instagram.com/bvnorthmvb/',
  instagramHandle: '@bvnorthmvb',
  youtube: 'https://www.youtube.com/@Bvnmvb',
  // Team BAND link published in the @bvnorthmvb Instagram bio
  band: 'https://band.us/n/a8a0b6IbObc6S',
  // Google Search Console "HTML tag" verification code: paste only the value of
  // the content="..." attribute. Leave empty to omit the tag.
  googleSiteVerification: '',
  league: {
    name: 'KC Boys Volleyball',
    url: 'https://kcboysvb.org/',
    standings: 'https://kcboysvb.org/index.php/archive-final-standings/',
    sanction: 'https://kcboysvb.org/',
  },
};

export type Position = 'OH' | 'MH' | 'DS' | 'RS' | 'S';

export const positionNames: Record<Position, string> = {
  OH: 'Outside Hitter',
  MH: 'Middle Hitter',
  DS: 'Defensive Specialist',
  RS: 'Right Side',
  S: 'Setter',
};

export interface Player {
  name: string;
  positions?: Position[];
}

// Source: 2026 roster graphic posted by @bvnorthmvb (March 2026)
export const roster: { season: number; groups: { id: string; title: string; players: Player[] }[] } = {
  season: 2026,
  groups: [
    {
      id: 'varsity',
      title: 'Varsity',
      players: [
        { name: 'Joshua Lobert', positions: ['OH', 'MH'] },
        { name: 'Felix Wu', positions: ['MH', 'OH'] },
        { name: 'Truman Singleton', positions: ['DS'] },
        { name: 'Drew Krystyn', positions: ['DS'] },
        { name: 'Gavin Stangler', positions: ['OH'] },
        { name: 'Kyle Chen', positions: ['OH'] },
        { name: 'Benjamin Knoblauch', positions: ['RS'] },
        { name: 'Hoyt Spachman', positions: ['MH'] },
        { name: 'Matthew Lobert', positions: ['S'] },
      ],
    },
    {
      id: 'floaters',
      title: 'JV / Varsity',
      players: [
        { name: 'Jude Vander Vegte', positions: ['MH'] },
        { name: 'Jaden Ward', positions: ['DS'] },
        { name: 'Andrew Nam', positions: ['DS'] },
        { name: 'Soham Muranjan', positions: ['MH'] },
      ],
    },
    {
      id: 'jv',
      title: 'Junior Varsity',
      players: [
        { name: 'Julian Humphrey' },
        { name: 'Joshua Kim' },
        { name: 'Dhanush Kunduri' },
        { name: 'Markus Noll' },
        { name: 'Kushal Swaroop' },
        { name: 'Nathan Syrett' },
        { name: 'Sam Atchison' },
        { name: 'Jacob Yarnevich' },
      ],
    },
  ],
};

export interface MatchDay {
  date: string; // ISO date
  site: 'Home' | 'Away';
  opponents: string[];
}

// Source: 2026 varsity and JV schedule graphics posted by @bvnorthmvb
// (March 2026). White dates on the graphic = home, blue = away.
export const varsitySchedule: MatchDay[] = [
  { date: '2026-03-26', site: 'Home', opponents: ['Bonner Springs', 'Lawrence Free State'] },
  { date: '2026-04-01', site: 'Away', opponents: ['Blue Valley Northwest', 'Bishop Miege'] },
  { date: '2026-04-07', site: 'Away', opponents: ['Blue Valley Southwest', 'St. Thomas Aquinas'] },
  { date: '2026-04-16', site: 'Home', opponents: ['Blue Valley West', 'St. James Academy'] },
  { date: '2026-04-23', site: 'Away', opponents: ['St. Thomas Aquinas', 'Blue Valley'] },
  { date: '2026-04-29', site: 'Away', opponents: ['Olathe South', 'Bonner Springs'] },
];

export const jvSchedule: MatchDay[] = [
  { date: '2026-04-01', site: 'Away', opponents: ['Blue Valley Northwest', 'Bishop Miege'] },
  { date: '2026-04-07', site: 'Away', opponents: ['Blue Valley Southwest', 'Louisburg'] },
  { date: '2026-04-09', site: 'Away', opponents: ['Blue Valley Northwest', 'Bishop Miege'] },
  { date: '2026-04-13', site: 'Away', opponents: ['St. James Academy', 'Blue Valley Northwest'] },
  { date: '2026-04-16', site: 'Home', opponents: ['Blue Valley West', 'St. James Academy'] },
  { date: '2026-04-22', site: 'Away', opponents: ['Olathe West', 'Kansas School for the Deaf'] },
];

// Source: @bvnorthmvb posts on May 3, 4 and 5, 2026, the account bio
// ("25-26 State Championship" third place) and the KC Boys Volleyball
// 2026 tournament calendar (state tournament May 2, Final Four May 5).
export const postseason = [
  {
    date: '2026-05-02',
    title: 'State Tournament',
    detail: 'Went 4-0 on the day to earn a spot in the Final Four.',
  },
  {
    date: '2026-05-05',
    title: 'State Semifinal',
    detail: 'Played KC East in the first semifinal at Horejsi Arena.',
  },
  {
    date: '2026-05-05',
    title: 'Third Place',
    detail: 'Finished third at the 2026 state championship.',
  },
];

// Source: KC Boys Volleyball archived final standings (2025 and 2026 images).
export const seasons = [
  {
    year: 2026,
    level: 'Varsity',
    wins: 16,
    losses: 6,
    setWins: 35,
    setLosses: 17,
    rank: 5,
    teams: 29,
    finish: 'State third place',
  },
  {
    year: 2026,
    level: 'JV',
    wins: 9,
    losses: 7,
    setWins: 22,
    setLosses: 18,
    rank: 8,
    teams: 17,
  },
  {
    year: 2025,
    level: 'Varsity',
    wins: 9,
    losses: 10,
    setWins: 21,
    setLosses: 30,
    rank: 14,
    teams: 24,
  },
];
