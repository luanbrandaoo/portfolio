import create from 'zustand';

import Resume from './program/resume';
import Mail from './program/mail';
import Github from './program/github';
import VSCode from './program/vscode';
import AfterEffects from './program/aftereffects';

export const componentMap = {
  "Résumé": Resume,
  "Mail": Mail,
  "Github": Github,
  "VS Code": VSCode,
  "After Effects": AfterEffects
}

const useProgramStore = create((set) => ({
  programs: [],
  addProgram: (program) => set((state) => ({ programs: [...state.programs, program] })),
  removeProgram: (programName) => set((state) => ({ programs: state.programs.filter((p) => p.programName !== programName) })),
}));

export default useProgramStore;

