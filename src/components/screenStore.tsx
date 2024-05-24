import {create} from 'zustand';

const useScreenStore = create((set) => ({
    size: {width: window.innerWidth, height: window.innerHeight},
    updateScreenSize: (width, height) => set(() => ({
      size: {width, height}
    })),
}));

export default useScreenStore;