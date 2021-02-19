import React, { useState } from 'react'
import { Col, Media, Row } from 'react-bootstrap';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import SideNav from '../components/SideNav';
import { useForm } from "react-hook-form";
import { update_user, update_picture } from "../actions/auth"

function Dashboard( { update_user, update_picture, access, currentUser }) {
    const [hover, setHover] = useState("100%")
    const { register, errors, handleSubmit } = useForm();
    const {
        register: register2,
        handleSubmit: handleSubmit2
      } = useForm();
   
    
    const edit = {
        color: "#0275d8",
        padding: "1rem"
    }

    const red = {
        color: "red"
    }

    const onHoverCam = () => {
        setHover("150%")
    }

    const onHover = () => {
        setHover("100%")
    }


    const onSubmit = async (data) => {
        alert("submitting")
        update_user(data).then(
            (res) => {
                if (res === 200){
                    alert("Profile updated successfully")
                }else {
                    alert("something went wrong")
                }
                window.location.reload()
            }
        )
    }

    const onSubmitPic = async (data) => {
        alert("submitting")
        update_picture(data).then(
            (res) => {
                if (res === 200){
                    alert("Profile updated successfully")
                }else {
                    alert("something went wrong")
                }
                window.location.reload()
            }
        )
    }


    if(!access) {
        return <Redirect to="/" />
    }

    return (
        <div>
            <Row>
                <Col lg="2">
                    <SideNav />
                </Col>
                <Col lg="10">
                    <div className="mt-3 ">
                        <Media className="row">
                            <div className="col-md-3 col-sm-12">
                                <div className="position-relative bg-dark" style={{width:"15rem", height: "15rem"}}>
                                    <img
                                        width={250}
                                        height={250}
                                        className="mr-3"
                                        src={currentUser.profile_pic}
                                        alt="Avatar"
                                    />
                                    <div className="position-absolute top-100 start-100 translate-middle">
                                        <i className="fa fa-camera text-white" style={{fontSize: hover}}
                                        data-bs-toggle="modal" data-bs-target="#profile_picture" 
                                        onMouseOver={onHoverCam} onMouseLeave={onHover}></i>
                                    </div>

                                </div>
                            </div>
                            <Media.Body className="col-md-9 ps-0 ms-0 col-sm-12">
                                <h5 className="text-capitalize">{currentUser.username}<i className="fas fa-pencil-alt"
                                data-bs-toggle="modal" data-bs-target="#update_profile"  style={edit}></i></h5>
                                <p>100 Level</p>
                                <p className="text-wrap" style={{width: "50%"}}>
                                    {currentUser.summary}
                                </p>
                            </Media.Body>
                        </Media>

                        <div className="modal fade" id="profile_picture" tabIndex="-1" 
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Profile Picture</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="">

                                    </div>
                                    <form onSubmit={handleSubmit2(onSubmitPic)}  >
                                        <div className="mb-3">
                                            <label htmlFor="formFile" className="form-label">Set Profile Picture</label>
                                            <input className="form-control" type="file" name="profile_pic" 
                                            ref={register2} id="formFile" />
                                        </div>
                                        <button type="submit" className="btn btn-primary" >Save changes</button>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal fade" id="update_profile" tabIndex="-1" 
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Update Bio</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit(onSubmit)}  >
                                        <div className="mb-3">
                                            <div className="form-group mb-3 p-2">
                                                <label htmlFor="formUsername" className="form-label">
                                                    Username
                                                </label>
                                                <input type="text" className="form-control" 
                                                id="formUsername" defaultValue={currentUser.username} ref={register({
                                                required: "This field is required",
                                                minLength: {
                                                    value: 8,
                                                    message: 'Minimum of 8 character length' 
                                                }
                                                })} 
                                                name="username" placeholder="Enter your username" />
                                                <span style={red}> {errors.username?.message} </span>
                                            </div>
                                            <div className="form-group mb-2 p-2">
                                                <label htmlFor="formSummary" className="form-label">
                                                    Summary
                                                </label>
                                                <textarea name="summary" className="form-control" 
                                                id="formSummary" defaultValue={currentUser.summary} ref={register({
                                                    required: "This field is required",
                                                    maxLength : {
                                                        value: 254,
                                                        message: "Text limit reached"
                                                    }
                                                    })} rows={3} maxLength="255"></textarea>
                                                    <span style={red}> {errors.summary?.message} </span>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary" >Save changes</button>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = state => ({
    access: state.auth.access,
    currentUser: state.auth.user
})

export default connect(mapStateToProps, { update_user, update_picture })(Dashboard);