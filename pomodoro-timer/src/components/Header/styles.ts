import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;

      display: flex;
      justify-content: center;
      align-items: center;

      color: ${(props) => props.theme['gray-100']};

      border-bottom: 3px solid transparent;
      border-top: 3px solid transparent;

      &:hover {
        border-bottom: 3px solid ${(props) => props.theme['blue-500']};
      }

      &.active {
        color : ${(props) => props.theme['blue-500']};
      }
    }
  }
`;