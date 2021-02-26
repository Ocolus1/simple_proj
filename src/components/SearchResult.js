import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { get_all_posts, get_search } from "../services/user.services"
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';

function SearchResult() {
    return (
        <div>
            
        </div>
    )
}

const mapStateToProps = state => ({
    access: state.auth.access,
    currentUser: state.auth.user
})


export default connect(mapStateToProps, { })(SearchResult);