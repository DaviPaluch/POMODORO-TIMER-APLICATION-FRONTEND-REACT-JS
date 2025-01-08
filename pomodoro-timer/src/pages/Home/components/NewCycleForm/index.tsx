import { FormContainer, TaskInput, MinutesAmountInput } from "./style";
import { useContext } from "react";
import { CycleContext } from "../..";
import { useFormContext } from "react-hook-form";



export function NewCycleForm() { 

  const {activeCycle} = useContext(CycleContext);
  const { register } = useFormContext(); 

  return (
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
  )
}