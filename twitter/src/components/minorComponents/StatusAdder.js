import React, {useState, useEffect} from 'react'
import { Form, FormControl, Button } from "react-bootstrap";

const StatusAdder = () => {
    return (
        <div className = 'center'>
            <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Example textarea</Form.Label>
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