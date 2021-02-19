import React from 'react'
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';


function Contact({ access }) {


    if(!access) {
        return <Redirect to="/" />
    }
    return (
        <div>
            Contact
        </div>
    )
}

const mapStateToProps = state => ({
    access: state.auth.access,
})

export default connect(mapStateToProps, { })(Contact);
