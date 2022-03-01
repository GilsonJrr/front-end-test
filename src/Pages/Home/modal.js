import React,{useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux';
import { del } from '../../features/Number/numberSlice'
import { setModalNumber, setModalMPrice, setModalSPrice } from '../../features/modalSlice'
import '../../App.css';

function AddnUpdateModal(props) {

    useEffect(()=>{
        if(props.modalTitle == 'Add'){
            dispatch(setModalNumber(''))
            dispatch(setModalMPrice(''))
            dispatch(setModalSPrice(''))
        }
    },[])

    const dispatch = useDispatch();

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }else{
        props.HandleAdd();
      }
  
      setValidated(true);

    };

    if(validated == false){
        // alert('show')
    }

  return (
    <Modal.Dialog className='ModalStyle'>

        <Modal.Header closeButton onClick={()=> props.setAddModal(false)}>
            <Modal.Title>{props.modalTitle} Number</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                
                <FloatingLabel label="Number" className="mb-3">
                    <Form.Control 
                        value={useSelector(state => state.ModalValues.ModalNumber)}  
                        onChange={(event)=> dispatch(setModalNumber(event.target.value))} 
                        required
                        // type="number"
                        placeholder="First name"
                        defaultValue="+55 84 88888-8888"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Number.
                    </Form.Control.Feedback>
                </FloatingLabel>

                <Row>
                    <Col>
                    <FloatingLabel controlId="floatingInputGrid" label="Monthy Price">
                        <Form.Control 
                            required  
                            type="number" 
                            value={useSelector(state => state.ModalValues.ModalMPrice)} 
                            placeholder='0.08' 
                            onChange={(event)=> dispatch(setModalMPrice(event.target.value))} 
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Monthy Price.
                        </Form.Control.Feedback>
                    </FloatingLabel>
                    </Col>
                    <Col>
                    <FloatingLabel controlId="floatingInputGrid" label="Setup Price">
                        <Form.Control 
                            required 
                            type="number" 
                            value={useSelector(state => state.ModalValues.ModalSPrice)} 
                            placeholder='8.88' 
                            onChange={(event)=> dispatch(setModalSPrice(event.target.value))} 
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Setup Price.
                        </Form.Control.Feedback>
                    </FloatingLabel>
                    </Col>
                </Row>

                <Row className="mb-3">
                </Row>
                
                <Button type="submit">Save changes</Button>
            </Form>
        </Modal.Body>

    </Modal.Dialog>
  );
}

export default AddnUpdateModal;

export function DelModal(props){

    function HandleDelete (){
        props.dispatch(del({id: props.id}))
        props.setDelModal(false)
    }

    return(
        <div>
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Are you sure you what to delete this number {props.value} ?</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() =>props.setDelModal(false)}>Close</Button>
                    <Button variant="danger" onClick={HandleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
}