import PropTypes from "prop-types";
import Button from "../Button";
import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import { ButtonContainer, Form } from "./styles";
import { useRef, useState } from "react";

export default function ContactForm({ buttonLabel }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");

    const emailInput = useRef(null)
    //const emailInput = document.getElementById('input-email')
    //emailInput.value
function handleClick(){
    alert("Formulário submetido com sucesso!");
}
    return (
        <Form>
            <button type="button" onClick={handleClick}>
                logar
            </button>
            <FormGroup>
                <Input
                    value={name}
                    placeholder="Nome"
                    onChange={(event) => setName(event.target.value)}
                />
            </FormGroup>

            <FormGroup /** error="O formato do e-mail é invalido."*/ >
                <Input
                defaultValue="dsm@gmail.com"
                    placeholder="E-mail"
                    ref={emailInput}
                    /**error */
                />
            </FormGroup>

            <FormGroup>
                <Input
                type="number"
                    placeholder="Telefone"
                    value={telefone}
                    onChange={(event) => setTelefone(event.target.value)}
                />
            </FormGroup>

            <FormGroup>
                <Select>
                    <option value="inst">Instagram</option>
                    <option value="inst">Instagram1</option>
                    <option value="inst">Instagram2</option>
                </Select>
            </FormGroup>

            <ButtonContainer>
                <Button type="subimit">{buttonLabel}</Button>
            </ButtonContainer>
        </Form>
    );
}

ContactForm.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
};
