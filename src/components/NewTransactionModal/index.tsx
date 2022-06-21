import Modal from 'react-modal';
import { Container, RadioBox } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/incomeImg.svg';
import outcomeImg from '../../assets/outcomeImg.svg';
import { TransactionTypeContainer } from './styles'
import { FormEvent, useState } from 'react';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose} : NewTransactionModalProps) {

  const [ type, setType ] = useState('deposit')

  const [title, setsTitle] = useState('');
  const [category, setCategory] = useState('');
  const [value, setValue] = useState(0);


  function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    console.log({
      title,
      category,
      value,
      type
    })
  }

  return (

    <Modal 
        isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >

        <button 
        type='button'
        onClick={onRequestClose}
        className="react-modal-close"
        >
          <img src={closeImg} alt="Fechar Modal"/>
        </button>

        <Container
          onSubmit={handleCreateNewTransaction}
        >

        <h2>Cadastrar transação</h2>


        <input 
          placeholder="Título"
          onChange={(e) => {setsTitle(e.target.value)}}
          value={title}
        />

        <input 
          type="number"
          placeholder="Valor"
          onChange={(e) => {setValue(Number(e.target.value))}}
          value={value}
        />

        <TransactionTypeContainer>
          <RadioBox
            type='button'
            onClick={() => {setType('deposit')}}
            isActive={type === 'deposit'}
            activeColor='green'
          >
            <img src={incomeImg} alt="Entrada"/>
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type='button'
            onClick={() => {setType('withdraw')}}
            isActive={type === 'withdraw'}
            activeColor='red'
          >
            <img src={outcomeImg} alt="Saída"/>
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input placeholder='Categoria' 
          onChange={(e) => {setCategory(e.target.value)}}
          value={category}
        />

        <button type="submit">
          Cadastrar
        </button>

        </Container>
      </Modal>
  )
}