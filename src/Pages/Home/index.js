import React,{useState,useEffect} from 'react';
import * as Icon from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { retrivedNumber, del, add, update } from '../../features/Number/numberSlice'
import { setModalNumber, setModalMPrice, setModalSPrice } from '../../features/modalSlice'
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import AddnUpdateModal from './modal';
import '../../App.css';

function Home() {

  const dispatch = useDispatch();

  const [addModal, setAddModal] = useState(false)
  const [modalTitle, setModalTitle] = useState("''")
  const modalNumber = useSelector(state => state.ModalValues.ModalNumber)
  const modalMPrice = useSelector(state => state.ModalValues.ModalMPrice)
  const modalSPrice = useSelector(state => state.ModalValues.ModalSPrice)
  const [modalId, setModalId] = useState("")

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

    setAddModal(false)

  }

  function HandleUpdate(id, value, monthyPrice, setupPrice){
    setModalTitle('Update')

    setModalId(id)
    dispatch(setModalNumber(value))
    dispatch(setModalMPrice(monthyPrice))
    dispatch(setModalSPrice(setupPrice))

    setAddModal(true)
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
                        <Button variant="success" onClick={ ()=> HandleUpdate(item.id, item.value, item.monthyPrice, item.setupPrice ) }>Update</Button>{' '}
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
                HandleAdd={HandleAdd}
            />
        </div>
      }

    </div>
  );
}

export default Home;