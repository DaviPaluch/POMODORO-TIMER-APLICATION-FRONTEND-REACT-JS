import { ThemeProvider } from "styled-components";
import { Button } from "./components/Button";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";


export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <p>Hello World</p>

      <Button variant="primary">Enviar</Button>
      <Button variant="secondary">Enviar</Button>
      <Button variant="danger">Enviar</Button>
      <Button variant="success">Enviar</Button>
      <Button >Enviar</Button>

      <GlobalStyle />
    </ThemeProvider>
  )
}


