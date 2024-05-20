import create from 'zustand';

const useProgramStore = create((set) => ({
  programs: [],
  addProgram: (program) => set((state) => ({ programs: [...state.programs, program] })),
  removeProgram: (programName) => set((state) => ({ programs: state.programs.filter((p) => p.programName !== programName) })),
}));

export default useProgramStore;
