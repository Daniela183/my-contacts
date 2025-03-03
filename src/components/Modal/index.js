import React from "react";
import PropTypes from "prop-types";
import ReactDom from "react-dom";
import Button from "../Button";
import { Overlay, Container, Footer } from "./styles";

export default function Modal({
    danger,
    title,
    children,
    isLoading,
    //cancelLabel,
    confirmLabel,
    onCancel,
    onConfirm,
    visible,
}) {
    if (!visible) return null;
    return ReactDom.createPortal(
        <Overlay>
            <Container danger={danger}>
                <h1>{title}</h1>
                <div className="modal-body">
                    {children}
                </div>

                <Footer>
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        Cancelar
                    </button>
                    <Button
                        type="button"
                        danger={danger}
                        onClick={onConfirm}
                        isLoading={isLoading}
                    >
                        {confirmLabel}
                    </Button>
                </Footer>
            </Container>
        </Overlay>,
        document.getElementById("modal-root")
    );
}

Modal.propTypes = {
    danger: PropTypes.bool,
    title: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
    visible: PropTypes.bool,
    children: PropTypes.node.isRequired,
    cancelLabel: PropTypes.string,
    confirmLabel: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

Modal.propTypes = {
    danger: false,
    isLoading: false,
    visible: false,
    cancelLabel: "Cancelar",
    confirmLabel: "Confirmar",
};
