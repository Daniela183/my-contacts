/* eslint-disable react/react-in-jsx-scope */
import {
    useEffect,
    useState,
    forwardRef,
    useImperativeHandle,
  } from 'react';
  import PropTypes from 'prop-types';
  import useErrors from '../../hooks/useErrors';
  import isEmailValid from '../../utils/isEmailValid';
  import formatPhone from '../../utils/formatPhone';
  import FormGroup from '../FormGroup';
  import Input from '../Input';
  import Select from '../Select';
  import Button from '../Button';

  import CategoriesService from '../../services/CategoriesService';

  import { Form, ButtonContainer } from './styles';

  const ContactForm = forwardRef(function ContactForm({ buttonLabel, onSubmit }, ref) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);

    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [isSubmitting, setIsSumitting] = useState(false);

    const {
      setError,
      removeError,
      //getErrorMessageByFieldName,
      errors,
    } = useErrors();

    useEffect(() => {
      async function loadCategories() {
        setIsLoadingCategories(true);
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

    const isFormValid = (name && errors.length === 0);

    useImperativeHandle(ref, () => ({
      setFieldsValues: (contact) => {
        setName(contact.name ?? '');
        setEmail(contact.email ?? '');
        setPhone(formatPhone(contact.phone) ?? '');
        setCategoryId(contact.category_id ?? '');
      },
      resetFields: () => {
        setName('');
        setEmail('');
        setPhone('');
        setCategoryId('');
      },
    }), []);

    function handleNameChange(event) {
      setName(event.target.value);

      if (!event.target.value) {
        setError({ field: 'name', message: 'Nome é obrigatório' });
      } else {
        removeError('name');
      }
    }

    function handleEmailChange(event) {
      setEmail(event.target.value);

      if (event.target.value && !isEmailValid(event.target.value)) {
        setError({ field: 'email', message: 'E-mail inválido' });
      } else {
        removeError('email');
      }
    }

    function handlePhoneChange(event) {
      setPhone(formatPhone(event.target.value));
    }

    async function handleSubmit(event) {
      event.preventDefault();

      setIsSumitting(true);

      await onSubmit({
        name, email, phone, categoryId,
      });

      setIsSumitting(false);
    }

    return (
      <Form onSubmit={handleSubmit} noValidate>
        <FormGroup >
          <Input

            placeholder="Nome *"
            value={name}
            onChange={handleNameChange}
            disabled={isSubmitting}
          />
        </FormGroup>

        <FormGroup >
          <Input
            type="email"

            placeholder="E-mail"
            value={email}
            onChange={handleEmailChange}
            disabled={isSubmitting}

          />
        </FormGroup>

        <FormGroup>
          <Input
            maxLength="15"
            placeholder="Telefone"
            value={phone}
            onChange={handlePhoneChange}
            disabled={isSubmitting}
          />
        </FormGroup>

        <FormGroup isLoading={isLoadingCategories}>
          <Select
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            disabled={isLoadingCategories || isSubmitting}
          >
            <option value="">Sem categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormGroup>

        <ButtonContainer>
          <Button type="submit" disabled={!isFormValid} isLoading={isSubmitting}>
            {buttonLabel}
          </Button>
        </ButtonContainer>
      </Form>
    );
  });

  ContactForm.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  export default ContactForm
 //ContactForm.displayName = 'ContactForm'
