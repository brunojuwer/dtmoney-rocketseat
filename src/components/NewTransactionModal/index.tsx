import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/incomeImg.svg';
import outcomeImg from '../../assets/outcomeImg.svg';


import { Container, RadioBox } from './styles';
import { TransactionTypeContainer } from './styles'
import { useTransactions } from '../../hooks/useTransactions';



interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose} : NewTransactionModalProps) {

  const { createTransaction } = useTransactions();

  const [ type, setType ] = useState('deposit')
  const [ title, setsTitle ] = useState('');
  const [ category, setCategory ] = useState('');
  const [ amount, setAmount ] = useState(0);


  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type
    })

    setAmount(0);
    setType('');
    setsTitle('');
    setCategory('');
    onRequestClose();
    
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
          onChange={(e) => {setAmount(Number(e.target.value))}}
          value={amount}
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