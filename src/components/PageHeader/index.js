import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import PropTypes from "prop-types";

import { Container } from "./styles";

export default function PageHeader({title}){
    return (
        <Container>
            <a href='/'>
            <FaArrowLeft  color="#5061fc"/>
            <span>Voltar</span>
            </a>
            <h1>{title}</h1>
        </Container>
    );
}

PageHeader.propTypes = {
    title: PropTypes.string.isRequired
};
