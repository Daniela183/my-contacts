import React from "react";
import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";

export default function EditContact() {
    return (
        <>
            <PageHeader title="Editar Daniela Melo" />
            <ContactForm buttonLabel="Salvar Alterações" />
        </>
    );
}
