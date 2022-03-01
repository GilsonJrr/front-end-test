import React,{useState,useEffect} from 'react';
import * as Icon from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { retrivedNumber, del, add, update, setStarred, delStar } from '../../features/Number/numberSlice'
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import AddnUpdateModal from './modal';
import '../../App.css';

function Home() {

  const dispatch = useDispatch();

  const [addModal, setAddModal] = useState(false)
  const [modalTitle, setModalTitle] = useState("''")
  const [modalNumber, setModalNumber] = useState("")
  const [modalMPrice, setModalMPrice] = useState("")
  const [modalSPrice, setModalSPrice] = useState("")
  const [modalId, setModalId] = useState("")
  const [modalCurrency, setModalCurrency] = useState("U$")

  const data = useSelector(state => state.number.itens)
  const [number, setnumber] = useState('')

  useEffect(()=>{
    dispatch(retrivedNumber())
  },[])

  function HandleNumber (event){
    setnumber(event.target.value)
  }

  function HandleDelete (id){

    dispatch(del({id: id}))
    
  }

  function CallAdd(){
    setModalTitle('Add')
    setAddModal(true)

    setModalNumber('')
    setModalMPrice('')
    setModalSPrice('')
    setModalCurrency('')
  }

  function HandleAdd (){
    
    if(modalTitle == 'Add'){
      dispatch(add({
        id: FilteredData[FilteredData.length -1].id +1,
        value: modalNumber,
        monthyPrice: modalMPrice,
        setupPrice: modalSPrice,
        currency: "U$",
      })) 
    }

    if(modalTitle == 'Update'){
      dispatch(update({
        id: modalId,
        value: modalNumber,
        monthyPrice: modalMPrice,
        setupPrice: modalSPrice,
        currency: "U$",
      }))
    }
  
    setModalNumber('')
    setModalMPrice('')
    setModalSPrice('')
    setModalCurrency('')

    setAddModal(false)

  }

  function HandleUpdate(id, value, monthyPrice, setupPrice, currency){
    setModalTitle('Update')

    setModalId(id)
    setModalNumber(value)
    setModalMPrice(monthyPrice)
    setModalSPrice(setupPrice)
    setModalCurrency(currency)

    setAddModal(true)
  }

  function HandleCurrency(event){
    setModalCurrency(event.target.value)
  }

  const FilteredData = data.filter(a => a.value.includes(number))

  return (
    <div className="App">

      <div className='LogoDiv'>
        <p1>Number Management</p1>
      </div>

      <div className='Filter'>
        <div className='Search'>
          <Icon.Search color="#E1E1F2"/>
          <input value={number} onChange={HandleNumber} placeholder='Search for number ...' />
        </div>
        <Button variant="primary" className='Button' onClick={CallAdd}>Add Number</Button>
      </div>

      <div className='TableWidth'>
        <Table hover>
            <thead>
                <tr>
                  <th>Number</th>
                  <th>Monthy Price</th>
                  <th>Setup Price</th>
                  <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {FilteredData.map((item) => {
                  return(
                    <tr>
                      <td>{item.value}</td>
                      <td>{item.currency} {item.monthyPrice}</td>
                      <td>{item.currency} {item.setupPrice}</td>
                      <td>
                        <Button variant="success" onClick={ ()=> HandleUpdate(item.id, item.value, item.monthyPrice, item.setupPrice, item.currency) }>Update</Button>{' '}
                        <Button variant="danger" onClick={ ()=> HandleDelete(item.id) }>Delete</Button>
                      </td>
                    </tr>    
                  )
                })}
            </tbody>
        </Table>
      </div>

      {addModal &&
        <div className='DelModal'>
            <AddnUpdateModal
                setAddModal={setAddModal}
                modalTitle={modalTitle}
                modalNumber={modalNumber}
                setModalNumber={setModalNumber}
                modalMPrice={modalMPrice}
                setModalMPrice={setModalMPrice}
                modalSPrice={modalSPrice}
                setModalSPrice={setModalSPrice}
                HandleCurrency={HandleCurrency}
                modalCurrency={modalCurrency}
                HandleAdd={HandleAdd}
            />
        </div>
      }

    </div>
  );
}

export default Home;