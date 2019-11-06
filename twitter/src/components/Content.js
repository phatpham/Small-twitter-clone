import React from 'react'
import Items from './minorComponents/Items'
import StatusAdder from './minorComponents/StatusAdder'
import { Container , Row} from 'react-bootstrap'

const Content = () => {
    return (
        <Container>
            <Row></Row> 
            <Row className="justify-content-md-center">
                <StatusAdder />
                <Items />
            </Row>
            <Row></Row>
        </Container>
    )
}

export default Content