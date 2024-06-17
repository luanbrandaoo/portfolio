import { create } from 'zustand'

const useStartMenuStore = create((set) => ({
  startOpen: false,
  setStartOpen: (isOpen) => set({ startOpen: isOpen }),
  toggleStartOpen: () => set((state) => ({ startOpen: !state.startOpen }))
}))

export default useStartMenuStore
