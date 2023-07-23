import styles from './style.module.css';
import { setTitle } from '../../utils/generalFunctions';

import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from '../../lib/axios';
import useAuth from '../../hooks/auth/useAuth';
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Login = () => {
    setTitle();

    const { setAuth, persist, setPersist } = useAuth();
    
    const navigate = useNavigate();
    const location = useLocation();
    const redirection = location.state?.from?.pathname || '/';

    const usernameOrEmailRef = useRef();
    const errRef = useRef();

    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => { usernameOrEmailRef.current.focus(); }, [])
    useEffect(() => { setErrMsg(''); }, [usernameOrEmail, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/user/login',
                JSON.stringify({ usernameOrEmail, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const accessToken = response?.data?.accessToken;
            const username = response?.data?.username;
            const email = response?.data?.email;
            setAuth({ username, email, accessToken });

            setUsernameOrEmail('');
            setPassword('');
            navigate(redirection, { replace: true }); // We redirect to the previous page
        } catch (err) {
            if(!err?.response) {
                setErrMsg("The server didn't respond.");
                setTimeout(() => { setErrMsg(''); }, 4000)
            } else if([400, 401].includes(err.response?.status)) {
                setErrMsg(err.response?.data?.message);
                setTimeout(() => { setErrMsg(''); }, 4000)
            } else {
                setErrMsg('Login failed.');
                setTimeout(() => { setErrMsg(''); }, 4000)
            }
            errRef.current.focus();
        }
    }

    const togglePersist = () => { setPersist(prev => !prev); }

    useEffect(() => {
        localStorage.setItem('persist', persist);
    }, [persist])

    return (
        <div className={`${styles.container} container`}>
            <div className={styles.form_container}>
                <div className={styles.form}>
                    <form onSubmit={handleSubmit} style={{marginBottom: "20px"}}>
                        <h1 className={styles.title}>Login</h1>
                        <p ref={errRef} className={errMsg ? styles.err_message : 'hide'} aria-live="assertive">{errMsg}</p>

                        <div className={styles.input_field} style={{marginTop: '30px'}}>
                            <FontAwesomeIcon icon={faUser} className={styles.input_icon} />
                            <input
                                type="text" id="usernameOrEmail" ref={usernameOrEmailRef} autoComplete="off" placeholder='Your username or email'
                                onChange={(e) => setUsernameOrEmail(e.target.value)} value={usernameOrEmail} required
                            />
                        </div>

                        <div className={styles.input_field}>
                            <FontAwesomeIcon icon={faUnlockKeyhole} className={styles.input_icon} />
                            <input
                                type="password" id="password" placeholder='Your password'
                                onChange={(e) => setPassword(e.target.value)} value={password} required
                            />
                        </div>
                        
                        <div style={{marginTop: '35px'}}>
                            <input type="checkbox" id="persist_checkBox" className={styles.checkBox} onChange={togglePersist} checked={JSON.parse(persist)} />
                            <label htmlFor='persist_checkBox'>Remember me</label>
                        </div>

                        <button className={`${styles.input_field} ${styles.button} button button-full`} disabled={(!usernameOrEmail || !password) ? true : false}>
                            Sign in
                        </button>
                    </form>

                    <div>You don't have an account ? <a href="/register">Register</a></div>
                </div>
            </div>
        </div>
    )
}
