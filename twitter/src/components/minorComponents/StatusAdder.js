import React from 'react'
import { Form, Button } from "react-bootstrap";

const StatusAdder = () => {
    return (
        //Form to add status
        <div className = 'center'>
            <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Enter your status</Form.Label>
                <Form.Control as="textarea" rows="3" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
        </div>
    )
}
export default StatusAdder