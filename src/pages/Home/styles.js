import styled from "styled-components";

export const Container = styled.div`
    margin-top: 32px;
    position: relative;
    margin-bottom: 32px;
`;
export const InputSearchContainer = styled.div`
    width: 100%;

    input {
        width: 100%;
        height: 50px;
        background: #fff;
        border: none;
        border-radius: 25px;
        box-shadow: 8px 4px 18px rgba(0, 0, 0.04);
        outline: 0;
        padding: 0 16px;

        &::placeholder {
            color: #bcbcbc;
        }
    }
`;
export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: ${({ justifyContent }) => justifyContent};
    margin-top: 32px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray.cinza};
    padding-bottom: 16px;

    strong {
        color: ${({ theme }) => theme.colors.gray.escuro};
        font-size: 24px;
    }

    a {
        color: ${({ theme }) => theme.colors.primary.main};
        text-decoration: none;
        font-weight: bold;
        border: 2px solid ${({ theme }) => theme.colors.primary.main};
        padding: 8px 16px;
        border-radius: 4px;
        transition: all 0.2s ease-in;

        &:hover {
            background: ${({ theme }) => theme.colors.primary.main};
            color: #fff;
        }
    }
`;
export const ListHeader = styled.header`
    margin-top: 24px;

    button {
        background: transparent;
        border: none;
        display: flex;
        align-items: center;
    }

    span {
        margin-right: 8px;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.primary.main};
    }
`;

export const Card = styled.div`
    background: #fff;
    box-shadow: 8px 4px 10px rgba(0, 0, 0.04);
    margin-top: 5px;
    padding: 16px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & + & {
        margin-top: 16px;
    }

    .info {
        .contact-name {
            display: flex;
            align-items: center;

            small {
                background: ${({ theme }) => theme.colors.primary.lighter};
                color: ${({ theme }) => theme.colors.primary.main};
                font-weight: bold;
                text-transform: uppercase;
                padding: 4px;
                border-radius: 4px;
                margin-left: 8px;
            }
        }
        span {
            display: block;
            font-size: 14px;
            color: ${({ theme }) => theme.colors.gray.claro};
        }
    }
    .actions {
        display: flex;
        align-items: center;

        button {
            background: transparent;
            border: none;
            margin-left: 8px;
        }
    }
`;

export const ErrorContainer = styled.div`
    margin-top: 16px;
    display: flex;
    align-items: center;

    .details {
        margin-left: 24px;
    }

    strong {
        font-size: 22px;
        color: ${({ theme }) => theme.colors.danger.main};
        display: block;
        margin-bottom: 8px;
    }
`;

export const EmptyListContainer = styled.div`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        color: ${({ theme }) => theme.colors.gray.claro};
        text-align: center;
        margin-top: 8px;
    }

    strong {
        color: ${({ theme }) => theme.colors.primary.main};
    }
`;

export const SearchNotFoundContainer = styled.div`
    margin-top: 16px;
    display: flex;
    align-items: flex-start;

    span {
        color: ${({ theme }) => theme.colors.gray.claro};
        margin-left: 24px;
        word-break: break-word;
        flex: 1
    }
`;
