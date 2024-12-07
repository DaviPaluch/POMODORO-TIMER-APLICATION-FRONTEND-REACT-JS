import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonContarinerProps {
  variant: ButtonVariant;
}

const buttonVariants = {
  primary: 'blue',
  secondary: 'gray',
  danger: 'red',
  success: 'green'
};

export const ButtonContainer = styled.button<ButtonContarinerProps>`
width: 100px;
height: 40px;

background-color: ${props => props.theme.secondary};

/* ${props => {
    return css`
    background-color: ${buttonVariants[props.variant]};
  `
  }} */
`;