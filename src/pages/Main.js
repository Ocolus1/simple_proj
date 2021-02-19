import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import Slide from '../components/Slide';
import { useForm } from "react-hook-form";
import {newsletter} from "../actions/auth"
import { get_all_posts } from "../services/user.services"


function Main({ access, newsletter }) {
    const {register, handleSubmit} = useForm();
    const [posts, setPosts] = useState([])

    useEffect(() => {
        get_all_posts().then(
            (res) => {
                console.log(res.data)
                setPosts(res.data)
            }
        )
    }, [])

    const onSubmit = async (data) => {
        newsletter(data).then(
            (res) => {
                console.log(res)
                if (res === "Network Error") {
                    alert("There is something wrong with the connection.")
                }else if (res === "Request failed with status code 400") {
                    alert("You are already a subscriber")
                }else if (res === "Request failed with status code 500") {
                    alert("Server down")
                }
            }
        )
    }


    if(!access) {
        return <Redirect to="/" />
    }

    return (
        <div className="mb-5 pb-5">
            <Container className="shadow p-3 mb-5 bg-white rounded">
                <div>
                    <Slide />
                </div>
                <div>
                    <Row className="pt-5">
                        <Col lg="9">
                            <div className="text-wrap p-3">
                                <h2 className="py-1">Courses</h2>
                                <div className="text-break">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                                    Excepteur sint occaecat cupidatat non proident, sunt in 
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </div>
                            </div>
                            <div className="text-wrap p-3">
                                <h2 className="py-1">Test &amp; Exam</h2>
                                <div className="text-break">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                                    Excepteur sint occaecat cupidatat non proident, sunt in 
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </div>
                            </div>
                            <div className="text-wrap p-3">
                                <h2 className="py-1">Forum</h2>
                                <div className="text-break">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                                    Excepteur sint occaecat cupidatat non proident, sunt in 
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </div>
                            </div>
                        </Col>
                        <Col xs lg="3">
                            <h2 className="pt-3">Recent News</h2>
                            <div className="shadow p-3 mb-4 bg-white rounded">
                                {posts.slice(0, 3).map((post) => (
                                    <div>
                                        <div key={post.id} className="row pt-2">
                                            <div className="col-4">
                                            <img
                                                className="d-block w-100"
                                                height="40px"
                                                width="100%"
                                                src={post.thumbnail}
                                                alt="slide"
                                            />
                                            </div>
                                            <div className="col-8 ps-0">
                                                <Link  to={`/blog/${post.id}`} 
                                                className="text-decoration-none" target="_blank">
                                                    <h5 className="card-title">
                                                        {post.title}    
                                                    </h5>
                                                </Link>
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                ))}
                                
                            </div>
                            <div className="shadow p-3 mb-3 bg-white rounded">
                                <p>Subscribe to our Newsletter</p>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="email" name="email" 
                                        ref={register} placeholder="Enter email" />
                                    </Form.Group>
                                    <Button variant="outline-success" className="d-block w-100 my-2" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    access: state.auth.access,
})

export default connect(mapStateToProps, { newsletter })(Main);