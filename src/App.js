import React,{useState,useEffect} from 'react';
import * as Icon from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { retrivedNumber, del, add, update } from '../src/features/Number/numberSlice'
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import './App.css';

function App() {

  const dispatch = useDispatch();

  const [addModal, setAddModal] = useState(false)
  const [modalTitle, setModalTitle] = useState("''")
  const [modalNumber, setModalNumber] = useState("")
  const [modalMPrice, setModalMPrice] = useState("")
  const [modalSPrice, setModalSPrice] = useState("")
  const [modalId, setModalId] = useState("")
  const [modalCurrency, setModalCurrency] = useState("")

  const data = useSelector(state => state.number.itens)
  const [starredData, setStarredData] = useState([])
  const [number,setnumber] = useState('')

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

    setAddModal(false)

  }

  function HandleStarred (id, value, monthyPrice, setupPrice, currency){
    setStarredData([
      {
      id: id,
      value: value,
      monthyPrice: monthyPrice,
      setupPrice: setupPrice,
      currency: currency,
      }
    ])
  }

  function HandleUpdate(id, value, monthyPrice, setupPrice){
    setModalTitle('Update')

    setModalId(id)
    setModalNumber(value)
    setModalMPrice(monthyPrice)
    setModalSPrice(setupPrice)

    setAddModal(true)
  }

  const FilteredData = data.filter(a => a.value.trim().includes(number.trim()))

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

      <div  className='AccordionHeader'>

      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Starred</Accordion.Header>
          <Accordion.Body>
            <Table hover >
              <thead>
                <tr>
                  <th>Star</th>
                  <th>Number</th>
                  <th>Monthy Price</th>
                  <th>Setup Price</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {starredData.map((item) => {
                  return(
                    <tr className='NumbList'>
                      <td>< Form.Check type="switch"/></td>
                      <td>{item.value}</td>
                      <td>{item.currency} {item.monthyPrice}</td>
                      <td>{item.currency} {item.setupPrice}</td>
                      <td>
                        <Button variant="success">Update</Button>{' '}
                        <Button variant="danger" onClick={ ()=> HandleDelete(item.id) }>Delete</Button>
                      </td>
                    </tr>    
                  )
                })}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="0">
          <Accordion.Header>All</Accordion.Header>
          <Accordion.Body>
            <Table hover >
              <thead>
                <tr>
                  <th>Star</th>
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
                      <td>< Form.Check type="switch" onClick={ ()=> HandleStarred(item.id,item.value,item.monthyPrice,item.setupPrice,item.currency)}/></td>
                      <td>{item.value}</td>
                      <td>{item.currency} {item.monthyPrice}</td>
                      <td>{item.currency} {item.setupPrice}</td>
                      <td>
                        <Button variant="success" onClick={ ()=> HandleUpdate(item.id, item.value, item.monthyPrice, item.setupPrice) }>Update</Button>{' '}
                        <Button variant="danger" onClick={ ()=> HandleDelete(item.id) }>Delete</Button>
                      </td>
                    </tr>    
                  )
                })}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      </div>

      {addModal &&
        <div className='DelModal'>
          <Modal.Dialog >
            <Modal.Header closeButton onClick={()=> setAddModal(false)}>
              <Modal.Title>{modalTitle} Number</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <FloatingLabel controlId="floatingInput" label="Number" className="mb-3">
                <Form.Control value={modalNumber} placeholder='+55 84 88888-8888' onChange={(event)=> setModalNumber(event.target.value)} />
              </FloatingLabel>

              <Row>
                <Col>
                  <FloatingLabel controlId="floatingInputGrid" label="Monthy Price">
                    <Form.Control value={modalMPrice} placeholder='0.08' onChange={(event)=> setModalMPrice(event.target.value)} />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel controlId="floatingInputGrid" label="Setup Price">
                    <Form.Control value={modalSPrice} placeholder='8.88' onChange={(event)=> setModalSPrice(event.target.value)} />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel controlId="floatingSelectGrid" label="Currency">
                    <Form.Select>
                      <option value="1">U$</option>
                      <option value="2">R$</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>
              </Row>

            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={()=> setAddModal(false)}>Close</Button>
              <Button 
                variant="primary" 
                onClick={ HandleAdd } 
              >Save changes</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      }

    </div>
  );
}

export default App;