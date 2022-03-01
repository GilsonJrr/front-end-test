import React,{useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

function AddnUpdateModal(props) {

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
    <Modal.Dialog>

        <Modal.Header closeButton onClick={()=> props.setAddModal(false)}>
            <Modal.Title>{props.modalTitle} Number</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                
                <FloatingLabel label="Number" className="mb-3">
                    <Form.Control 
                        value={props.modalNumber}  
                        onChange={(event)=> props.setModalNumber(event.target.value)} 
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
                        <Form.Control required type="number" value={props.modalMPrice} placeholder='0.08' onChange={(event)=> props.setModalMPrice(event.target.value)} />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Monthy Price.
                        </Form.Control.Feedback>
                    </FloatingLabel>
                    </Col>
                    <Col>
                    <FloatingLabel controlId="floatingInputGrid" label="Setup Price">
                        <Form.Control required type="number" value={props.modalSPrice} placeholder='8.88' onChange={(event)=> props.setModalSPrice(event.target.value)} />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Setup Price.
                        </Form.Control.Feedback>
                    </FloatingLabel>
                    </Col>
                </Row>

                <Row className="mb-3">
                </Row>
                
                <Button type="submit" >Save changes</Button>
            </Form>
        </Modal.Body>

    </Modal.Dialog>
  );
}

export default AddnUpdateModal; 