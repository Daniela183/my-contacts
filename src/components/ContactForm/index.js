import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { ButtonContainer, Form } from "./styles";

import isEmailValid from "../../utils/isEmailValid";
import FormatPhone from "../../utils/formatPhone";
import useErrors from "../../hooks/useErrors";
import CategoriesService from "../../services/CategoriesService";

import Button from "../Button";
import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import propTypes from "prop-types";

export default function ContactForm({ buttonLabel, onSubmit }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { setError, removeError, getErrorMensageByFieldName, errors } =
        useErrors();

    const isFormValid = name && errors.length === 0;

    useEffect(() => {
        async function loadCategories() {
            try {
                const categoriesList = await CategoriesService.listCategories();
                setCategories(categoriesList);
            } catch {
                //
            } finally {
                setIsLoadingCategories(false);
            }
        }
        loadCategories();
    }, []);

    function hadleNameChange(event) {
        setName(event.target.value);

        if (!event.target.value) {
            setError({ field: "name", message: "O campo nome é obrigatório" });
        } else {
            removeError("name");
        }
    }

    function hadleEmailChange(event) {
        setEmail(event.target.value);

        if (event.target.value && !isEmailValid(event.target.value)) {
            setError({ field: "email", message: "E-mail inválido" });
        } else {
            removeError("email");
        }
    }

    function handlePhoneChange(event) {
        setPhone(FormatPhone(event.target.value));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsSubmitting(true);

        await onSubmit({
            name,
            email,
            phone,
            categoryId,
        });

        setIsSubmitting(false);
        setName('');
        setEmail('');
        setPhone('');
        setCategoryId('');
    }

    return (
        <Form onSubmit={handleSubmit} noValidate>
            <FormGroup error={getErrorMensageByFieldName("name")}>
                <Input
                    error={getErrorMensageByFieldName("name")}
                    placeholder="Nome *"
                    value={name}
                    onChange={hadleNameChange}
                    disabled={isSubmitting}
                />
            </FormGroup>

            <FormGroup error={getErrorMensageByFieldName("email")}>
                <Input
                    type="email"
                    error={getErrorMensageByFieldName("email")}
                    placeholder="E-mail"
                    value={email}
                    onChange={hadleEmailChange}
                    disabled={isSubmitting}
                />
            </FormGroup>

            <FormGroup>
                <Input
                    placeholder="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    disabled={isSubmitting}
                />
            </FormGroup>

            <FormGroup isLoading={isLoadingCategories || isSubmitting}>
                <Select
                    value={categoryId}
                    onChange={(event) => setCategoryId(event.target.value)}
                    disabled={isLoadingCategories}
                >
                    <option value="">Sem categoria</option>

                    {categories.map((categoryId) => (
                        <option key={categoryId.id} value={categoryId.id}>
                            {categoryId.name}
                        </option>
                    ))}
                </Select>
            </FormGroup>

            <ButtonContainer>
                <Button
                    type="subimit"
                    disabled={!isFormValid}
                    isLoading={isSubmitting}
                >
                    {buttonLabel}
                </Button>
            </ButtonContainer>
        </Form>
    );
}

ContactForm.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    onSubmit: propTypes.func.isRequired,
};
