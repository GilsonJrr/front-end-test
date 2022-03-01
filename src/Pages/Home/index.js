import React,{useState,useEffect} from 'react';
import * as Icon from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { retrivedNumber, del, add, update } from '../../features/Number/numberSlice'
import { setModalNumber, setModalMPrice, setModalSPrice } from '../../features/modalSlice'
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import AddnUpdateModal from './modal';
import { DelModal } from './modal';
import userimg from '../../img/user.png'
import '../../App.css';

function Home() {

  const dispatch = useDispatch();

  const [addModal, setAddModal] = useState(false)
  const [delModal, setDelModal] = useState(false)
  const [delID, setDelId] = useState('')
  const [delValue, setDelValue] = useState('')

  const [modalTitle, setModalTitle] = useState("''")
  const modalNumber = useSelector(state => state.ModalValues.ModalNumber)
  const modalMPrice = useSelector(state => state.ModalValues.ModalMPrice)
  const modalSPrice = useSelector(state => state.ModalValues.ModalSPrice)
  const [modalId, setModalId] = useState("")

  const data = useSelector(state => state.number.itens)
  const [number, setnumber] = useState('')

  const [user, setUser] = useState('Admin')
  const [totalShow, setTotalShow] = useState(5)
  const [seeAll, setSeeAll] = useState('See All')

  useEffect(()=>{
    dispatch(retrivedNumber())
  },[])

  function HandleNumber (event){
    setnumber(event.target.value)
  }

  function HandleDelete (id,value){

    setDelModal(true)
    setDelId(id)
    setDelValue(value)
    
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

  function HandleTotalShow(){
    
    if(seeAll == 'See All'){
        setTotalShow(FilteredData.length)
        setSeeAll('See Less')
    }

    if(seeAll == 'See Less'){
        setTotalShow(8)
        setSeeAll('See All')
    }
    
  }

  const FilteredData = data.filter(a => a.value.includes(number))

  return (
    <div className="App">

      <div className='LogoDiv'>
        <p1>Telecom Carrier</p1>
        <div className='UserDiv'>
            <p2>Welcome, {user}</p2>
            <img src={userimg}/>
        </div>
      </div>

      <div className='Filter'>
        <div className='Search'>
          <Icon.Search color="#E1E1F2"/>
          <input value={number} onChange={HandleNumber} placeholder='Search for number ...' />
        </div>
        <Button variant="primary" className='Button' onClick={CallAdd}>Add Number</Button>
      </div>
    
      <div className='Table'>
        <div className='HeaderTable'>
            <p1>Phone Numbers</p1>
        </div>
        <Table borderless>
            <thead>
                <tr>
                  <th>Number</th>
                  <th>Monthy Price</th>
                  <th>Setup Price</th>
                  <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {FilteredData.slice(0, totalShow).map((item) => {
                  return(
                    <tr>
                      <td>{item.value}</td>
                      <td>{item.currency} {item.monthyPrice}</td>
                      <td>{item.currency} {item.setupPrice}</td>
                      <td>
                        <Button className='ButtonUpdate' variant="success" onClick={ ()=> HandleUpdate(item.id, item.value, item.monthyPrice, item.setupPrice ) }>Update</Button>{' '}
                        <Button className='ButtonDelete' variant="danger" onClick={ ()=> HandleDelete(item.id, item.value) }>Delete</Button>
                      </td>
                    </tr>    
                  )
                })}
            </tbody>
        </Table>
        <div className='FooterTable'>
            <p1>{FilteredData.length} Total phone Numbers</p1>
            <p2 onClick={HandleTotalShow}>{seeAll}</p2>
        </div>
      </div>

      { addModal &&
        <div className='AddnUpdateModal'>
            <AddnUpdateModal
                setAddModal={setAddModal}
                modalTitle={modalTitle}
                HandleAdd={HandleAdd}
            />
        </div>
      }
      { delModal &&
        <div className='AddnUpdateModal'>
            <DelModal
                setDelModal={setDelModal}
                dispatch={dispatch}
                id={delID}
                value={delValue}
            />
        </div>
      }

    </div>
  );
}

export default Home;