import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PersonaMode = 'ROOKIE' | 'VETERAN';
export type RegulationEra = '2025_GROUND_EFFECT' | '2026_ACTIVE_AERO';
export type TeamAccent = 'FERRARI' | 'MERCEDES' | 'MCLAREN' | 'ASTON_MARTIN';

export interface TeamTheme {
  id: TeamAccent;
  name: string;
  hex: string;
  rgb: string;
}

export const TEAM_THEMES: Record<TeamAccent, TeamTheme> = {
  FERRARI: {
    id: 'FERRARI',
    name: 'Scuderia Ferrari',
    hex: '#E8002D',
    rgb: '232, 0, 45',
  },
  MERCEDES: {
    id: 'MERCEDES',
    name: 'Mercedes-AMG',
    hex: '#00D2BE',
    rgb: '0, 210, 190',
  },
  MCLAREN: {
    id: 'MCLAREN',
    name: 'McLaren F1',
    hex: '#FF8000',
    rgb: '255, 128, 0',
  },
  ASTON_MARTIN: {
    id: 'ASTON_MARTIN',
    name: 'Aston Martin',
    hex: '#229971',
    rgb: '34, 153, 113',
  },
};

interface AppState {
  persona: PersonaMode;
  regulationEra: RegulationEra;
  teamAccent: TeamAccent;
  xp: number;
  setPersona: (persona: PersonaMode) => void;
  togglePersona: () => void;
  setRegulationEra: (era: RegulationEra) => void;
  setTeamAccent: (accent: TeamAccent) => void;
  addXp: (amount: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      persona: 'ROOKIE',
      regulationEra: '2026_ACTIVE_AERO',
      teamAccent: 'FERRARI',
      xp: 120, // Starting XP for telemetry HUD preview
      setPersona: (persona) => set({ persona }),
      togglePersona: () =>
        set((state) => ({
          persona: state.persona === 'ROOKIE' ? 'VETERAN' : 'ROOKIE',
        })),
      setRegulationEra: (regulationEra) => set({ regulationEra }),
      setTeamAccent: (teamAccent) => set({ teamAccent }),
      addXp: (amount) => set((state) => ({ xp: state.xp + amount })),
    }),
    {
      name: 'apex-academy-storage', // Key name in browser localStorage
    }
  )
);