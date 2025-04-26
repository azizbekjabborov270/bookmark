import React, { useRef, useState } from 'react'
import logo from "../images/Group 200.png"
import user from "../images/user.png"
import lock from "../images/lock.png"
import styled from 'styled-components'
import axiosInstance from '../utils/AxiosInstance'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const loginRef = useRef()
    const passRef = useRef()

    const [visible, setVisible] = useState(false)

    const navigate = useNavigate()

    function loginFunc(e) {
        e.preventDefault()

        const obj = {
            "email": loginRef.current.value,
            "password": passRef.current.value,
            // "email": "eve.holt@reqres.in",
            // "password": "cityslicka"
        }

        console.log(obj);
        axiosInstance.post("/api/login", obj)
            .then((res) => {
                // console.log(res.data);
                localStorage.setItem("token", res?.data?.token)
                navigate("/books")
            })
            .catch((res) => {
                alert("Login yoki parol xato")
            })

    }

    return (
        <Wrapper>
            <div className="modal">
                <img src={logo} alt="logo" />

                <form className='form' onSubmit={(e) => loginFunc(e)}>
                    <div className="input-box">
                        <img className='input-image' src={user} alt="user" />
                        <input className='input' type="text"
                            placeholder='USERNAME' required
                            ref={loginRef}
                        />
                    </div>

                    <div className="input-box" style={{ marginTop: "20px" }}>
                        <img className='input-image' src={visible ? user : lock} alt="user"
                            onClick={() => setVisible(!visible)} />
                        <input className='input' type={visible ? "text" : "password"}
                            placeholder='Password' required
                            ref={passRef}
                        />
                    </div>

                    <button className='btn' type='submit'>Login</button>
                </form>
            </div>
        </Wrapper>
    )
}

export default Login

const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    background: url("./Login.jpg");
    position: relative;

    .modal {
        width: 300px;
        height: 323px;
        /* background-color: rebeccapurple; */
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }

    .form {
        margin-top: 50px;

        .input-box {
            position: relative;
            width: 300px;
            height: 45px;

            .input-image {
                position: absolute;
                top: 50%;
                left: 12px;
                transform: translateY(-50%);
            }

            .input {
                width: 100%;
                height: 100%;
                padding-left: 50px;

                border: 1px solid #fff;
                border-radius: 4px;
                outline: none;
                background-color: transparent;

                color: #fff;

                &::placeholder {
                    font-family: "Montserrat", sans-serif;
                    font-weight: 300;
                    font-size: 14px;
                    line-height: 143%;
                    text-transform: uppercase;
                    color: #fff;
                }
            }
        }

        .btn {
            width: 300px;
            height: 45px;
            border-radius: 4px;
            box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.3);
            background: #fff;
            font-family: "Montserrat", sans-serif;
            font-weight: 600;
            font-size: 16px;
            line-height: 125%;
            text-transform: uppercase;
            text-align: center;
            color: #0d75ff;
            margin-top: 40px;
            border: none;
        }
    }
`