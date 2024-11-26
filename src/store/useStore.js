import { create } from "zustand";

const useStore = create((set)=>({
    counter : 0,
    addCount : () => set((state)=>{counter : state.counter + 1})
}))

export default useStore;