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

const useProgramStore = create((set, get) => ({
  programs: [],
  addProgram: (program) => {
    const state = get();
    const existingProgram = state.programs.find((p) => p.programName === program.programName);
    if (existingProgram) {
      useProgramStore.getState().setState(program.programName, stateE.FOCUSED);
      return state;
    }
    set((state) => ({
      programs: [
        ...state.programs,
        {
          ...program,
          position: { x: 0, y: 0 },
          size: { width: 0, height: 0 },
          state: stateE.FOCUSED,
          index: Math.max(...state.programs.map(p => p.index), 0) + 1
        }
      ]
    }));
  },
  removeProgram: (programName) => set((state) => ({
    programs: state.programs.filter((p) => p.programName !== programName)
  })),
  setPosition: (programName, x, y) => set((state) => ({
    programs: state.programs.map((program) =>
      program.programName === programName ? { ...program, position: { x: x, y: y } } : program
    )
  })),
  setMinimumSize: (programName, width, height) => set((state) => ({
    programs: state.programs.map((program) =>
      program.programName === programName ? { ...program, minimumSize: { width: width, height: height } } : program
    )
  })),
  setSize: (programName, width, height) => set((state) => ({
    programs: state.programs.map((program) =>
      program.programName === programName ? { ...program, size: { width: width, height: height } } : program
    )
  })),
  setIndex: (programName, programIndex) => set((state) => ({
    programs: state.programs.map((program) =>
      program.programName === programName ? { ...program, index: programIndex } : program
    )
  })),
  setState: (programName, programState) => set((state) => {
    if (programState === stateE.FOCUSED) {
      const maxIndex = Math.max(...state.programs.map(p => p.index), 0);
      const updatedPrograms = state.programs.map((program) => {
        if (program.programName === programName) {
          return { ...program, state: stateE.FOCUSED, index: maxIndex + 1 };
        } else if (program.state === stateE.FOCUSED) {
          return { ...program, state: stateE.UNFOCUSED };
        }
        return program;
      });
      return { programs: updatedPrograms };
    } else {
      const updatedPrograms = state.programs.map((program) => (
        program.programName === programName ? { ...program, state: programState } : program
      ));
      return { programs: updatedPrograms };
    }
  }),
  updateGlobalSize: (newWidth, newHeight, oldWidth, oldHeight) => {
    const updatedPrograms = get().programs.map(program => {
      return {
        ...program,
        position: { 
          x: ((program.position.x * newWidth) / oldWidth), 
          y: ((program.position.y * newHeight) / oldHeight),
        },
        size: {
          width: Math.max(program.minimumSize.width, program.size.width * (newWidth / oldWidth)), 
          height: Math.max(program.minimumSize.height, program.size.height * (newHeight / oldHeight))
        }
      }});
    set({ programs: updatedPrograms });
  }
}));

export default useProgramStore;
