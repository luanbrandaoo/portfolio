import { create } from 'zustand';
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

const windowIndexList = {};

function windowIndexFocus(programName, state) {
  
  if (state !== stateE.FOCUSED) {
    return state;
  }

  const maxIndex = Math.max(0, ...Object.values(windowIndexList));

  if (programName in windowIndexList) {
    const originalIndex = windowIndexList[programName];

    windowIndexList[programName] = maxIndex + 1;

    for (let key in windowIndexList) {
      if (windowIndexList[key] > originalIndex) {
        windowIndexList[key]--;
      }
    }
  } else {
    windowIndexList[programName] = maxIndex + 1;
  }

  // debugging
  console.log('windowIndexList:', JSON.stringify(windowIndexList, null, 2));

  return state;
}

const useProgramStore = create((set, get) => ({
  programs: [],
  addProgram: (program) => {
    const state = get();
    const existingProgram = state.programs.find((p) => p.programName === program.programName);
    if (existingProgram) {
      useProgramStore.getState().setState(program.programName, stateE.FOCUSED);
      return state;
    }
    return set((state) => ({
      programs: [
        ...state.programs,
        {
          ...program,
          position: { x: 0, y: 0 },
          size: { width: 0, height: 0 },
          state: windowIndexFocus(program.programName, stateE.FOCUSED)
        }
      ]
    }));
  },
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
  setState: (programName, programState) => set((state) => {
    const updatedPrograms = state.programs.map((program) => {
      if (program.programName === programName) {
        return { ...program, state: windowIndexFocus(programName, programState) };
      } else if (programState === stateE.FOCUSED && program.state === stateE.FOCUSED) {
        return { ...program, state: stateE.UNFOCUSED };
      }
      return program;
    });

    return { programs: updatedPrograms };
  })
}));

export default useProgramStore;