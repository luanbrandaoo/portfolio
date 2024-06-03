import {create} from 'zustand';
import { useState, useEffect } from 'react';

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

export const stateE = {
  MINIMIZED: 0,
  UNFOCUSED: 1,
  FOCUSED: 2
}

const useProgramStore = create((set) => ({
  programs: [],
  addProgram: (program) => set((state) => ({
    programs: [...state.programs, { ...program, 
      position: {x: 0, y: 0}, size: {width: 0, height: 0}, state: stateE.FOCUSED}]
  })),
  removeProgram: (programName) => set((state) => ({
    programs: state.programs.filter((p) => p.programName !== programName)
  })),
  setPosition: (programName, x, y) => set((state) => ({
    programs: state.programs.map((program) =>
      program.programName === programName ? { ...program, position: {x: x, y: y} } : program
    )
  })),
  setSize: (programName, width, height) => set((state) => ({
    programs: state.programs.map((program) =>
      program.programName === programName ? { ...program, size: { width, height } } : program
    )
  })),
  setState: (programName, programState) => set((state) => ({
    programs: state.programs.map((program) =>
      program.programName === programName ? { ...program, state: programState } : program
    )
  }))
}));


export default useProgramStore;
