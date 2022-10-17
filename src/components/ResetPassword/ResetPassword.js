import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import app from '../../Hook/firebaseConfig';

const ResetPassword = (props) => {
    const [email, setEmail] = useState('');
    const auth = getAuth(app);

    const handleResetPassword = () => {

        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                Swal.fire('okay!', 'You are reset password successfully!', 'success')
                props.onHide();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

    }

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Forget Password
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className='text-danger m-3'>Reset your password</h5>
                    <input
                        onBlur={(e) => setEmail(e.target.value)}
                        className='form-control p-2 mt-3 ' type="email" name="email" id="" placeholder='Enter your email' />

                </Modal.Body>
                <Modal.Footer>
                    {/* <Button onClick={props.onHide}>Close</Button> */}
                    <Button onClick={handleResetPassword}>Update</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ResetPassword;