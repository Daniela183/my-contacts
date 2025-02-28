import React, { useEffect, useState } from "react";
//import { useParams, useHistory } from "react-router-dom";

import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";
import ContactsService from "../../services/ContactsService";
import Loader from "../../components/Loader";
import { toast } from "../../utils/toast";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";

export default function EditContact() {
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        async function loadContacts() {
            try {
                const contactData = await ContactsService.getContactById(id);
                console.log({ contactData });

                setIsLoading(false);
            } catch {
                history.push('/');
                toast({
                    type: "danger",
                    text: "Contato não encontrado!",
                });
            }
        }
        loadContacts();
    }, [id, history]);

    function handleSubmit() {
        //
    }

    return (
        <>
            <Loader isLoading={isLoading} />
            <PageHeader title="" />
            <ContactForm
                buttonLabel="Salvar Alterações"
                onSubmit={handleSubmit}
            />
        </>
    );
}
