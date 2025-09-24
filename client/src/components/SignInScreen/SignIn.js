import React, {useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import styles from './SignIn.module.css'
import { CartContext } from "../CartContext";


import Input from '../../common/Input';
import axios from 'axios';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const { setCartFromDB } = useContext(CartContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  
  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://ecommerce-project-nqsq.onrender.com/api/login", { email, password });

      login(res.data.user);
      if (res.data.user.cart) {
        setCartFromDB(res.data.user.cart);
      }
      console.log("login clicked");
      navigate("/profile");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.error || "Login failed");
    }
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.textContainer}>
        <h2 className={styles.heading}> Signin to your PopX account </h2>
        <h5 className={styles.description}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, </h5>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input label="Email Address" type="email" placeholder="Enter email address" onChange={(e)=> setEmail(e.target.value)} value={email}/>
        <Input label="Password" type="password" placeholder="Enter password" onChange={(e)=> setPassword(e.target.value)} value={password}/>
        <button type="submit" className={styles.loginButton}>
          Login
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  )
}

export default SignIn