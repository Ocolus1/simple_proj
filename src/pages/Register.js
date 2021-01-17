import React from 'react';
import { Button, Container, Form, Col } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import { useForm } from 'react-hook-form';

export default function Register() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => alert(JSON.stringify(data));

    return (
        <div>
            <Container>
                <Navigation />
                <Form onSubmit={handleSubmit(onSubmit)} className="shadow-lg p-3 mb-5 mt-4 bg-white rounded">
                    <div className="pl-5 pt-2 pb-5">

                        <h3 className="p-2 mx-1">Sign Up</h3>
                        <Form.Row className="my-2">
                            <Form.Group as={Col} controlId="formBasicName">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" ref={register} name="username" className="" placeholder="Enter username" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" ref={register} name="email" className="" placeholder="Enter email" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row className="my-2">
                            <Form.Group as={Col} controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={register} name="password" className="" placeholder="Password" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formBasicConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" ref={register} name="confirm_password" className="" placeholder="Confirm Password" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row >
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>User Type</Form.Label>
                                <Form.Control as="select" ref={register} name="user_type" defaultValue="Choose...">
                                    <option value="">Choose....</option>
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Button variant="primary" className="m-2" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    )
}
