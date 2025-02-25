import styled, {css} from "styled-components";

export default styled.button`
    height: 52px;
    border: none;
    padding: 0 16px;
    background: ${({ theme }) => theme.colors.primary.main};
    border: 2px solid #fff;
    border-radius: 4px;
    box-shadow: 8px 4px 10px rgba(0, 0, 0.04);
    font-size: 16px;
    font-weight:bold;
    color: #fff;
    transition: background 0.2s ease-in;

    &:hover{
        background: ${({ theme }) => theme.colors.primary.light};
    }

    &:active{
        background: ${({ theme }) => theme.colors.primary.dark};
    }

    &:disabled{
        background: #ccc;
        cursor: default;
    }

    ${({theme, danger})=> danger && css`
    background: ${theme.colors.danger.main};

    &:hover{
        background: ${theme.colors.danger.dark};
    }

    &:active{
        background: ${theme.colors.danger.dark};
    }
    `}
`;
