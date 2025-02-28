/* eslint-disable react/no-unescaped-entities */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaArrowUp, FaRegEdit, FaRegTrashAlt, FaBoxOpen, FaSearch  } from "react-icons/fa";
import { PiSmileySad } from "react-icons/pi";
//import { VscSearch } from "react-icons/vsc";

import Loader from "../../components/Loader";
import Button from "../../components/Button";
//import Modal from "../../components/Modal";
import {
    Container,
    InputSearchContainer,
    Header,
    ListHeader,
    Card,
    ErrorContainer,
    EmptyListContainer,
    SearchNotFoundContainer,
} from "../../pages/Home/styles";
import ContactsService from "../../services/ContactsService";

export default function Home() {
    const [contacts, setContacts] = useState([]);
    const [orderBy, setOrderBy] = useState("ASC");
    const [searchTem, setSearchTem] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const filterContacts = useMemo(() => {
        return contacts.filter((contact) =>
            contact.name.toLowerCase().includes(searchTem.toLowerCase())
        );
    }, [contacts, searchTem]);

    const LoadContacts = useCallback(async () => {
        try {
            setIsLoading(true);

            const contactsList = await ContactsService.listContacts(orderBy);
            //const contactsList = []; await ContactsService.listContacts(orderBy);

            setContacts(contactsList);
        } catch {
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    }, [orderBy]);

    useEffect(() => {
        LoadContacts();
    }, [LoadContacts]);

    function handleToggleOrderBy() {
        setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
    }

    function handleChangeSearchTem(event) {
        setSearchTem(event.target.value);
    }

    function handleTryAgain() {
        LoadContacts();
    }

    return (
        <Container>
            <Loader isLoading={isLoading} />

            {contacts.length > 0 && (
                <InputSearchContainer>
                    <input
                        value={searchTem}
                        type="text"
                        placeholder="Pesquisar contato..."
                        onChange={handleChangeSearchTem}
                    />
                </InputSearchContainer>
            )}

            <Header
                justifyContent={
                    hasError
                        ? "flex-end"
                        : contacts.length > 0
                        ? "space-between"
                        : "center"
                }
            >
                {!hasError && contacts.length > 0 && (
                    <strong>
                        {filterContacts.length}
                        {filterContacts.length === 1
                            ? " contato"
                            : " contatos"}{" "}
                    </strong>
                )}
                <a href="/new">Novo contato</a>
            </Header>

            {hasError && (
                <ErrorContainer>
                    <PiSmileySad style={{ color: "red", fontSize: "150px" }} />
                    <div className="details">
                        <strong>
                            Ocorreu um erro ao obter os seus contatos!
                        </strong>
                        <Button type="button" onClick={handleTryAgain}>
                            Tentar novamente
                        </Button>
                    </div>
                </ErrorContainer>
            )}

            {!hasError && (
                <>
                    {(contacts.length < 1 && !isLoading) && (
                        <EmptyListContainer>
                            <FaBoxOpen style={{color: 'blue', fontSize: '120px'}}/>
                            <p>
                                Você ainda não tem nenhum contato cadastrado!
                                Clique no botão <strong>"Novo contato"</strong>{" "}
                                à cima para cadastrar o seu primeiro!
                            </p>
                        </EmptyListContainer>
                    )}

                    {(contacts.length > 0 && filterContacts.length < 1 ) &&(
                        <SearchNotFoundContainer>
                            <FaSearch  style={{color: 'red', fontSize: '30px'}}/>
                            <span>Nenhum resultado foi encontrado para <strong>{ searchTem}</strong></span>
                        </SearchNotFoundContainer>
                    )}
                    {filterContacts.length > 0 && (
                        <ListHeader orderBy={orderBy}>
                            <button type="button" onClick={handleToggleOrderBy}>
                                <span>Nome</span>
                                <FaArrowUp
                                    color="#5061fc"
                                    style={{
                                        transform:
                                            orderBy === "asc"
                                                ? "rotate(180deg)"
                                                : "rotate(0deg)",
                                        transition: "transform 0.3s ease-in",
                                        // Adicionando animação suave
                                    }}
                                />
                            </button>
                        </ListHeader>
                    )}

                    {filterContacts.map((contact) => (
                        <Card key={contact.id}>
                            <div className="info">
                                <div className="contact-name">
                                    <strong>{contact.name}</strong>
                                    {contact.category_name && (
                                        <small>{contact.category_name}</small>
                                    )}
                                </div>
                                <span>{contact.email}</span>
                                <span>{contact.phone}</span>
                            </div>
                            <div className="actions">
                                <a href={`/edit/${contact.id}`}>
                                    <FaRegEdit color="#5061fc" />
                                </a>
                                <button type="button">
                                    <FaRegTrashAlt color="#f00" />
                                </button>
                            </div>
                        </Card>
                    ))}
                </>
            )}
        </Container>
    );
}
