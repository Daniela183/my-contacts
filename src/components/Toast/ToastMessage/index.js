/* eslint-disable react/react-in-jsx-scope */
import PropTypes from "prop-types";
import { FaRegCircleXmark } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { Container } from "./styles";
import { useEffect } from "react";

export default function ToastMessage({ message, onRemoveMessage }) {
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onRemoveMessage(message.id);
        }, message.duration || 7000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [message, onRemoveMessage]);

    function handleRemoveToast() {
        onRemoveMessage(message.id);
    }

    return (
        <Container type={message.type} onClick={handleRemoveToast}>
            {message.type === "danger" && (
                <FaRegCircleXmark
                    style={{ marginRight: "8px", fontSize: "20px" }}
                />
            )}

            {message.type === "success" && (
                <FaRegCheckCircle
                    style={{ marginRight: "8px", fontSize: "20px" }}
                />
            )}
            <strong>{message.text}</strong>
        </Container>
    );
}

ToastMessage.propTypes = {
    message: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["default", "success", "danger"]),
        duration: PropTypes.number,
    }).isRequired,
    onRemoveMessage: PropTypes.func.isRequired,
};
