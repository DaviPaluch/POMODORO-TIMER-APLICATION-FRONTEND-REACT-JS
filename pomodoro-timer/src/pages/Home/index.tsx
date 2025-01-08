import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { createContext, useState } from "react";
import { CountDown } from "./components/CountDown";
import { NewCycleForm } from "./components/NewCycleForm";

interface ICreateNewCicleForm {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CycleContextProps {
  activeCycle: Cycle | undefined;
  activeCycleId: string | undefined;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
}

export const CycleContext = createContext({} as CycleContextProps);

const formValidationSchema = zod.object({
  task: zod.string().min(1, "Deve ser preenchido."),
  minutesAmount: zod.number().min(1, "O Valor mínimo é 5 minutos").max(60, "O valor maximo é 60 minutos."),
});

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | undefined>(undefined);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0);


  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

   const newCycleForm = useForm<ICreateNewCicleForm>({
      resolver: zodResolver(formValidationSchema),
      defaultValues: {
        task: '',
        minutesAmount: 0,
      }
    });

  const { watch, handleSubmit, reset } = newCycleForm;  

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

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

  function handleCreateNewCicle(data: ICreateNewCicleForm) {
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

    reset()
  }

  function handleInterruptCycle() {
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

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCicle)}>

        <CycleContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed}}>
          
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <CountDown />
        </CycleContext.Provider>

        {activeCycle ? (
          <StopCountDownButton
            type="submit"
            onClick={handleInterruptCycle}
          >
            <HandPalm size={24} />
            Intenrromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton
            type="submit"
            disabled={isSubmitDisabled}
          >
            <Play size={24} />
            Iniciar
          </StartCountDownButton>
        )
        }
      </form>
    </HomeContainer >
  )
}