import { ThemeProvider } from "styled-components";
import { Button } from "./components/Button";
import { defaultTheme } from "./styles/themes/default";


export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="primary">Enviar</Button>
      <Button variant="secondary">Enviar</Button>
      <Button variant="danger">Enviar</Button>
      <Button variant="success">Enviar</Button>
      <Button >Enviar</Button>
    </ThemeProvider>
  )
}


