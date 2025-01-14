import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { CountDown } from "./components/CountDown";
import { NewCycleForm } from "./components/NewCycleForm";
import { useContext } from "react";
import { CycleContext } from "../../contexts/CycleContext";

interface ICreateNewCicleForm {
  task: string;
  minutesAmount: number;
}

const formValidationSchema = zod.object({
  task: zod.string().min(1, "Deve ser preenchido."),
  minutesAmount: zod.number().min(1, "O Valor mínimo é 5 minutos").max(60, "O valor maximo é 60 minutos."),
});

export function Home() {

  const {createNewCicle, interruptCycle, activeCycle} = useContext(CycleContext)

  const newCycleForm = useForm<ICreateNewCicleForm>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  });

  const { watch, handleSubmit, /*reset*/ } = newCycleForm;  



  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(createNewCicle)}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <CountDown />

        {activeCycle ? (
          <StopCountDownButton
            type="submit"
            onClick={interruptCycle}
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