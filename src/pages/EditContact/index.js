import React, { useEffect, useRef, useState } from "react";
//import { useParams, useHistory } from "react-router-dom";

import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";
import ContactsService from "../../services/ContactsService";
import Loader from "../../components/Loader";
import { toast } from "../../utils/toast";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";

export default function EditContact() {
    const { id } = useParams();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [contactName, setContactName] = useState('');

    const contactFormRef = useRef(null);

    useEffect(() => {
      async function loadContact() {
        try {
          const contact = await ContactsService.getContactById(id);

          contactFormRef.current.setFieldsValues(contact);
          setIsLoading(false);
          setContactName(contact.name);
        } catch {
          history.push('/');
          toast({
            type: 'danger',
            text: 'Contato não encontrado!',
          });
        }
      }

      loadContact();
    }, [id, history]);

    async function handleSubmit(formData) {
      try {
        const contact = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          category_id: formData.categoryId,
        };

        const contactData = await ContactsService.updateContact(id, contact);
        setContactName(contactData.name);

        toast({
          type: 'success',
          text: 'Contato editado com sucesso!',
          duration: 3000,
        });
      } catch {
        toast({
          type: 'danger',
          text: 'Ocorreu um erro ao editar o contato!',
        });
      }
    }
    return (
      <>
        <Loader isLoading={isLoading} />

        <PageHeader title={isLoading ? 'Carregando...' : `Editar ${contactName}`} />
        <ContactForm
          ref={contactFormRef}
          buttonLabel="Salvar Alterações"
          onSubmit={handleSubmit}
        />
      </>
    );
  }
