import React from "react";
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import Button from '../Button'
import { Overlay, Container, Footer } from "./styles";

export default function Modal({danger}) {
    return ReactDom.createPortal(
        <Overlay>
            <Container danger={danger}>
                <h1>Titulo</h1>
                <p>corpo</p>
                <Footer>
                    <button type="button" className='cancel-button'>
                        Cancelar
                    </button>
                    <Button type='button' danger={danger}>
                        Deletar
                    </Button>
                </Footer>
            </Container>
        </Overlay>,
        document.getElementById('modal-root')
    );
}

Modal.propTypes={
    danger: PropTypes.bool
}

Modal.propTypes={
    danger: false
}
