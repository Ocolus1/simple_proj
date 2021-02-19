import React from 'react'
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';


function About({ access }) {

    if(!access) {
        return <Redirect to="/" />
    }
    return (
        <div>
            About
        </div>
    )
}

const mapStateToProps = state => ({
    access: state.auth.access,
})

export default connect(mapStateToProps, {  })(About);
