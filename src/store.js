import { create } from 'zustand';

export const useStore = create((set) => ({
    isPerspective: true,
    toggleProjection: () => set((state) => ({ isPerspective: !state.isPerspective }))
}));
