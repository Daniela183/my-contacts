import { React, useState } from "react";
import PropTypes from "prop-types";

import { ButtonContainer, Form } from "./styles";

import isEmailValid from "../../utils/isEmailValid";
import FormatPhone from "../../utils/formatPhone";
import useErrors from "../../hooks/useErrors";

import Button from "../Button";
import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";

export default function ContactForm({ buttonLabel }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [category, setCategory] = useState("");

    const { setError, removeError, getErrorMensageByFieldName, errors } = useErrors();

    const isFormValid = (name && errors.length === 0);

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

    function handlePhoneChange(event){
        setPhone(FormatPhone(event.target.value));
    }

    function handleSubmit(event) {
        event.preventDefault();
       console.log({
           name,
           email,
           phone: phone.replace(/\D/g,''),
           category,
       });
    }
    return (
        <Form onSubmit={handleSubmit} noValidate>
            <FormGroup error={getErrorMensageByFieldName("name")}>
                <Input
                    error={getErrorMensageByFieldName("name")}
                    placeholder="Nome *"
                    value={name}
                    onChange={hadleNameChange}
                />
            </FormGroup>

            <FormGroup
                error={getErrorMensageByFieldName("email")}
            >
                <Input
                    type="email"
                    error={getErrorMensageByFieldName("email")}
                    placeholder="E-mail"
                    value={email}
                    onChange={hadleEmailChange}
                />
            </FormGroup>

            <FormGroup>
                <Input
                    placeholder="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                />
            </FormGroup>

            <FormGroup>
                <Select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                >
                    <option value="">Categoria</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Discordy">Discordy</option>
                </Select>
            </FormGroup>

            <ButtonContainer>
                <Button type="subimit" disabled={!isFormValid}>{buttonLabel}</Button>
            </ButtonContainer>
        </Form>
    );
}

ContactForm.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
};
