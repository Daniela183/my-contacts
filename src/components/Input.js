import styled, {css} from "styled-components";

export default styled.input`
    width: 100%;
    border: none;
    background: #fff;
    border: 2px solid #fff;
    box-shadow: 8px 4px 10px rgba(0, 0, 0.04);
    height: 52px;
    border-radius: 4px;
    outline: none;
    padding: 0 16px;
    font-size: 16px;
    transition: 0.2s ease-in;
    appearance: none;


    &:focus{
        border-color: ${({ theme }) => theme.colors.primary.main};
    }

   ${({theme, error}) => error && css`
   color: ${theme.colors.danger.main};
   border-color: ${theme.colors.danger.main} !important;
   `}

   &[disabled]{
        background-color: ${({ theme }) => theme.colors.gray.claro};
        border-color: ${({ theme }) => theme.colors.gray.escuro};
        opacity: 1;
    }
`;
