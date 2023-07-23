import styles from './style.module.css';
import { setTitle } from '../../utils/generalFunctions';

import { useRef, useState, useEffect } from "react";
import axios from '../../lib/axios';
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const userRegex = /^[A-z][A-z0-9-_]{3,18}$/;
const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!*@#$%]).{8,24}$/;

export const Register = () => {
    setTitle();

    const usernameRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => { usernameRef.current.focus(); }, [])
    useEffect(() => { setValidUsername(userRegex.test(username)); }, [username])

    useEffect(() => { setValidEmail(emailRegex.test(email)); }, [email])

    useEffect(() => {
        setValidPassword(passwordRegex.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword])

    useEffect(() => {
        setErrMsg('');
    }, [username, password, matchPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userRegex.test(username) || !passwordRegex.test(password)) { return setErrMsg("Invalid Entry"); } // Prevents JS hacks

        try {
            await axios.post('/user/register',
                JSON.stringify({ username, email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setSuccess(true);
            
            setUsername('');
            setEmail('');
            setPassword('');
            setMatchPassword('');
        } catch (err) {
            if(!err?.response) {
                setErrMsg("The server didn't respond.");
                setTimeout(() => { setErrMsg(''); }, 4000)
            } else if(err.response?.status === 409) {
                setErrMsg(err.response?.data?.message);
                setTimeout(() => { setErrMsg(''); }, 4000)
            } else {
                setErrMsg('Registration failed.');
                setTimeout(() => { setErrMsg(''); }, 4000)
            }
            errRef.current.focus();
        }
    }

    return (
        <div className={`${styles.container} container`}>
            {success 
                ? <h2>Success ! Now, log in</h2>
                : <div className={styles.form_container}>
                    <div className={styles.form}>
                        <form onSubmit={handleSubmit} style={{marginBottom: "20px"}}>
                            <h1 className={styles.title}>Register</h1>
                            <p ref={errRef} className={errMsg ? styles.err_message : 'hide'} aria-live="assertive">{errMsg}</p>

                            <div className={styles.input_field}>
                                <FontAwesomeIcon icon={faUser} className={styles.input_icon} />
                                <input
                                    type="text" id="username" ref={usernameRef} autoComplete="off" placeholder='Enter a username'
                                    onChange={(e) => setUsername(e.target.value)} required
                                    onFocus={() => setUsernameFocus(true)} onBlur={() => setUsernameFocus(false)}
                                    aria-invalid={validUsername ? "false" :"true"} aria-describedby="uidnote"
                                    style={{borderBottomColor: validUsername ? "var(--green)" : (username && "var(--red)")}}
                                />
                                <p id="uidnote" className={usernameFocus && username && !validUsername ? styles.instructions : "hide"}>
                                    4 to 24 characters (must begin with a letter).
                                    <br/>Letters, numbers, underscores or hyphens.
                                </p>
                            </div>

                            <div className={styles.input_field}>
                                <FontAwesomeIcon icon={faEnvelope} className={styles.input_icon} />
                                <input
                                    type="email" id="email" autoComplete="off" placeholder='Enter your email'
                                    onChange={(e) => setEmail(e.target.value)} required
                                    onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)}
                                    aria-invalid={validEmail ? "false" :"true"} aria-describedby="emailnote"
                                    style={{borderBottomColor: validEmail ? "var(--green)" : (email && "var(--red)")}}
                                />

                                <p id="emailnote" className={emailFocus && email && !validEmail ? styles.instructions : "hide"}>
                                    Must be a valid email.
                                </p>
                            </div>

                            <div className={styles.input_field}>
                                <FontAwesomeIcon icon={faUnlockKeyhole} className={styles.input_icon} />
                                <input
                                    type="password" id="password" placeholder='Enter a password'
                                    onChange={(e) => setPassword(e.target.value)} required
                                    onFocus={() => setPasswordFocus(true)} onBlur={() => setPasswordFocus(false)}
                                    aria-invalid={validEmail ? "false" :"true"} aria-describedby="pwdnote"
                                    style={{borderBottomColor: validPassword ? "var(--green)" : (password && "var(--red)")}}
                                />
                                <p id="pwdnote" className={passwordFocus && !validEmail ? styles.instructions : "hide"}>
                                    8 to 24 characters.
                                    <br/>Must include uppercase, lowercase letters, a number and a special character (! * @ # $ %).
                                </p>
                            </div>

                            <div className={styles.input_field}>
                                <FontAwesomeIcon icon={faUnlockKeyhole} className={styles.input_icon} />
                                <input
                                    type="password" id="password_confirm" placeholder='Confirm password'
                                    onChange={(e) => setMatchPassword(e.target.value)} value={matchPassword} required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                    style={{borderBottomColor: validMatch && matchPassword ? "var(--green)" : (matchPassword && "var(--red)")}}
                                />
                                <p id="confirmnote" className={matchFocus && !validMatch ? styles.instructions : "hide"}>
                                    Must match the first password input field.
                                </p>
                            </div>

                            <button
                                className={`${styles.input_field} ${styles.button} button button-full`} style={{height: "40px"}}
                                disabled={(!validUsername || !validEmail || !validPassword || !validMatch) ? true : false}
                            >
                                Sign up
                            </button>
                        </form>

                        <div>You already have an account ? <a href="/login">Log in</a></div>
                    </div>
                </div>
            }
        </div>
    )
}
