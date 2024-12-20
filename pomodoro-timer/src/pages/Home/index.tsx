import { HandPalm, Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, StopCountDownButton, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

const formValidationSchema = zod.object({
  task: zod.string().min(1, "Deve ser preenchido."),
  minutesAmount: zod.number().min(1, "O Valor mínimo é 5 minutos").max(60, "O valor maximo é 60 minutos."),
});

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

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0);

  const { register, handleSubmit, reset } = useForm<ICreateNewCicleForm>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  });
  // ao registrar o input, é possivel trabalhar com métodos como por exemplo 'onChange' e 'onBlur' e etc.

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;


  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate);

        if (secondsDifference >= totalSeconds) {
          setCycles((state) => state.map((cycle) => {
            if (cycle.id === activeCycleId) {
              return {
                ...cycle,
                finishedDate: new Date(),
              }
            }
            return cycle;
          }));

          setAmountSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval)
    };
  }, [activeCycle, activeCycleId, totalSeconds]);

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

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [activeCycle, minutes, seconds]);

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCicle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            list="task-suggestions"
            placeholder="Nome da tarefa"
            disabled={!!activeCycle}
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Escrever código" />
            <option value="Ler a literatura" />
            <option value="Fazer exercícios" />
            <option value="Fazer outros" />
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={1}
            max={60}
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

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