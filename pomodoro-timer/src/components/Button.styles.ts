import styled from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonContarinerProps {
  variant: ButtonVariant;
}

export const ButtonContainer = styled.button<ButtonContarinerProps>`
width: 100px;
height: 40px;
border-radius: 4px;
border: 0;


background-color: ${props => props.theme['blue-500']};
color: ${props => props.theme['white']};
`;