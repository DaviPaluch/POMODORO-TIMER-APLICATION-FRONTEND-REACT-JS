import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useState } from "react";

const formValidationSchema = zod.object({
  task: zod.string().min(1, "Deve ser preenchido."),
  minutesAmount: zod.number().min(5, "O Valor mínimo é 5 minutos").max(60, "O valor maximo é 60 minutos."),
});

interface ICreateNewCicleForm {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
}

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const { register, handleSubmit, watch, reset } = useForm<ICreateNewCicleForm>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  });
  // ao registrar o input, é possivel trabalhar com métodos como por exemplo 'onChange' e 'onBlur' e etc.

  function handleCreateNewCicle(data: ICreateNewCicleForm) {
    const newCycle: Cycle = {
      id: new Date().toISOString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
    }

    setCycles((state) => [...state, newCycle]);
    // sempre que alterar um estado que depende do seu valor anterior, 
    // é importante que esse estado seja atribuido com uma função. Pesquise sobre clousures.

    setActiveCycleId(newCycle.id);

    reset()
  }

  const task = watch('task');
  const isSubmitDisabled = !task;

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);
  console.log(activeCycle);

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
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountDownButton
          type="submit"
          disabled={isSubmitDisabled}
        >
          <Play size={24} />
          Iniciar
        </StartCountDownButton>
      </form>
    </HomeContainer >
  )
}