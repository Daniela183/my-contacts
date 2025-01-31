import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import {
    Container,
    InputSearchContainer,
    Header,
    ListContainer,
    Card,
} from "../../pages/Home/styles";
import { FaArrowUp, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

export default function Home() {
    return (
        <Container>
            {/*<Modal danger/>
            <Loader />*/}
            <InputSearchContainer>
                <input type="text" placeholder="Pesquisar contato..." />
            </InputSearchContainer>
            <Header>
                <strong>3 Contatos</strong>
                <a href="/new">Novo contato</a>
            </Header>
            <ListContainer>
                <header>
                    <button type="button">
                        <span>Nome</span>
                        <FaArrowUp color="#5061fc" />
                    </button>
                </header>
                <Card>
                    <div className="info">
                        <div className="contact-name">
                            <strong>Daniela Melo</strong>
                            <small>Instagram</small>
                        </div>
                        <span>danielasmelo182@gmail.com</span>
                        <span>(61) 9 9999-9999</span>
                    </div>
                    <div className="actions">
                        <a href="/edit/2">
                            <FaRegEdit color="#5061fc" />
                        </a>
                        <button type="button">
                            <FaRegTrashAlt color="#f00" />
                        </button>
                    </div>
                </Card>
                <Card>
                    <div className="info">
                        <div className="contact-name">
                            <strong>Daniela Melo</strong>
                            <small>Instagram</small>
                        </div>
                        <span>danielasmelo182@gmail.com</span>
                        <span>(61) 9 9999-9999</span>
                    </div>
                    <div className="actions">
                        <a href="/edit/2">
                            <FaRegEdit color="#5061fc" />
                        </a>
                        <button type="button">
                            <FaRegTrashAlt color="#f00" />
                        </button>
                    </div>
                </Card>
                <Card>
                    <div className="info">
                        <div className="contact-name">
                            <strong>Daniela Melo</strong>
                            <small>Instagram</small>
                        </div>
                        <span>danielasmelo182@gmail.com</span>
                        <span>(61) 9 9999-9999</span>
                    </div>
                    <div className="actions">
                        <a href="/edit/2">
                            <FaRegEdit color="#5061fc" />
                        </a>
                        <button type="button">
                            <FaRegTrashAlt color="#f00" />
                        </button>
                    </div>
                </Card>
            </ListContainer>
        </Container>
    );
}
