import React, { useEffect, useMemo, useState } from "react";
import { FaArrowUp, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

import Loader from "../../components/Loader";
//import Modal from "../../components/Modal";
import delay from "../../utils/delay";
import {
    Container,
    InputSearchContainer,
    Header,
    ListHeader,
    Card,
} from "../../pages/Home/styles";

export default function Home() {
    const [contacts, setContacts] = useState([]);
    const [orderBy, setOrderBy] = useState("ASC");
    const [searchTem, setSearchTem] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const filterContacts = useMemo(() => {
        return contacts.filter((contact) =>
            contact.name.toLowerCase().includes(searchTem.toLowerCase())
        );
    }, [contacts, searchTem]);


    useEffect(() => {
        async function LoadContacts() {
            try {
                setIsLoading(true);

                const response = await fetch(
                    `http://localhost:3001/contacts?orderBy=${orderBy}`
                );
                await delay(500);
                const json = await response.json();
                setContacts(json);
                setIsLoading(false);
            } catch (error) {
                console.log("error", error);
            }finally{
                setIsLoading(false);

            }
        }
        LoadContacts();
    }, [orderBy]);

    function handleToggleOrderBy() {
        setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
    }

    function handleChangeSearchTem(event) {
        setSearchTem(event.target.value);
    }

    return (
        <Container>
            <Loader isLoading={isLoading} />
            <InputSearchContainer>
                <input
                    value={searchTem}
                    type="text"
                    placeholder="Pesquisar contato..."
                    onChange={handleChangeSearchTem}
                />
            </InputSearchContainer>
            <Header>
                <strong>
                    {filterContacts.length}
                    {filterContacts.length === 1
                        ? " contato"
                        : " contatos"}{" "}
                </strong>
                <a href="/new">Novo contato</a>
            </Header>
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
        </Container>
    );
}
