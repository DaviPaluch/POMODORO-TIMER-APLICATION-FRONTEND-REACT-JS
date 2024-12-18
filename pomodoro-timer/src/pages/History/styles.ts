import styled from "styled-components";

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;

  display: flex;
  flex-direction:column;

  h1{
    font-size: 1.5rem;
    color: ${props => props.theme['gray-100']};
  }
`;

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    min-width: 600px;
    border-collapse: collapse; // não é contabilizada a borda de cima mais a borda de baixo.

    th{
      text-align: left;
      font-size: 1.125rem;
      background-color: ${props => props.theme['gray-600']};
      color: ${props => props.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6rem;
      padding: 1rem;

      &:first-child{
        padding-left: 1.5rem;
        border-top-left-radius: 8px;
      }
      &:last-child{
        padding-left: 1.5rem;
        border-top-right-radius: 8px;
      }
    }

    td{
      background-color: ${props => props.theme['gray-700']};
      border-top: 4px solid ${props => props.theme['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6rem;

      &:first-child{
        width: 45%;
        padding-left: 1.5rem;
      }
      &:last-child{
        padding-right: 1.5rem;
      }
    }
  }
`;

const STATUS_COLORS = {
  green: 'green-500',
  yellow: 'yellow-500',
  red: 'red-500',
} as const
interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS;
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before{
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${props => props.theme[STATUS_COLORS[props.statusColor]]};
  }
`;