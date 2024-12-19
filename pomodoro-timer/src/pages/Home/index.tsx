import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";
import { useForm } from "react-hook-form";

export function Home() {

  const { register, handleSubmit, watch } = useForm();
  // ao registrar o input, é possivel trabalhar com métodos como por exemplo 'onChange' e 'onBlur' e etc.

  function handleCreateNewCicle(data: any) {
    console.log(data);
  }

  const task = watch('task');
  const isSubmitDisabled = !task;

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
            step={5} min={5}
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