import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import SideNav from '../components/SideNav';

function MockE({ access }) {

    if(!access) {
        return <Redirect to="/" />
    }

    return (
        <div>
            <Row>
                <Col lg="2">
                    <SideNav />
                </Col>
                <Col xs lg="10">
                    MockE
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = state => ({
    access: state.auth.access,
})

export default connect(mapStateToProps, { })(MockE);
