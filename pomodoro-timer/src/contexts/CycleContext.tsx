import { createContext, ReactNode, useState } from "react";

export const CycleContext = createContext({} as CycleContextProps);

interface CycleContextProps {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCicle: (data: CreateCicleData) => void;
  interruptCycle: () => void;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CreateCicleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({children}: CyclesContextProviderProps) {

  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0);

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);
  
  function markCurrentCycleAsFinished() {
    setCycles((state) => state.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return {
          ...cycle,
          finishedDate: new Date(),
        }
      }
      return cycle;
    }));
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function createNewCicle(data: CreateCicleData) {
    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle]);
    // sempre que alterar um estado que depende do seu valor anterior, 
    // é importante que esse estado seja atribuido com uma função. Pesquise sobre clousures.

    setActiveCycleId(newCycle.id);

    // reset()
  }

  function interruptCycle() {
    setCycles((state) => state.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return {
          ...cycle,
          interruptedDate: new Date(),
        }
      }
      return cycle;
    }));

    setActiveCycleId(null);
  }

  return (
    <CycleContext.Provider 
      value={{ 
        activeCycle, 
        activeCycleId, 
        markCurrentCycleAsFinished, 
        amountSecondsPassed, 
        setSecondsPassed,
        createNewCicle,
        interruptCycle
        }}>
      {children}
    </CycleContext.Provider>
    
  )
}