import React from "react";
import PropTypes from "prop-types";
//import Input from "../../components/Input";
//import Select from "../../components/Select";
//import Button from "../../components/Button";
import { Container } from "./styles";


export default function FormGroup({children, error}) {
    return (
        <Container>
            {children}
            {error && <small>{error}</small>}
        </Container>
    );
}

FormGroup.propTypes = {
    children: PropTypes.node.isRequired,
    error: PropTypes.string,

}

FormGroup.defaultProps={
    error: null,
}
