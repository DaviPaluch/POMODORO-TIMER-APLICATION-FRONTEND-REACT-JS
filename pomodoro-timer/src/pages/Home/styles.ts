import styled from "styled-components";

export const HomeContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

const BaseCountDownButton = styled.button`
  width: 100%;
  padding: 1rem;
  border: 0;
  border-radius: 8px;

  display: flex;
  align-items: center;  
  justify-content: center;
  
  gap: 0.5rem;
  font-weight: bold;

  cursor: pointer;
  color: ${props => props.theme['gray-100']};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  
`;

export const StartCountDownButton = styled(BaseCountDownButton)`
  background: ${props => props.theme['blue-500']};

  &:not(:disabled):hover {
    background: ${props => props.theme['blue-700']};
  }
`;

export const StopCountDownButton = styled(BaseCountDownButton)`
  background: ${props => props.theme['red-500']};

  &:not(:disabled):hover {
    background: ${props => props.theme['red-700']};
  }
`;