import React,{useState,useEffect} from 'react'
import {useNavigate,useLocation,Link} from 'react-router-dom'
import api from '../api'

const Verifyotp = () => {
    const nav = useNavigate();
    const {state} = useLocation();
    const [email,setEmail] = useState(state?.email || '');
    const [otp,setOtp] = useState('');
    const [submitting,setSubmitting] = useState(false);
    const [msg,setMsg] = useState('');

    useEffect(()=>{
        if(state?.email) setEmail(state.email);
    },[state]);

    const verify = async(e) => {
        e.preventDefault();
        setMsg('');
        setSubmitting(true);

        try {
            const {data} = await api.post('/api/auth/verify-otp',{email,otp});
            if(data?.token){
                localStorage.setItem('token',data.token);
                nav('/contact',{replace:true});
            } else  {
                setMsg('verificaton faild')
            }
            setMsg(data ?.message || 'OTP SENT');
        } catch(err) {
            console.error(err);
        }
    }
  return <>
    <h2>Verify otp</h2>
    <form onSubmit={verify}>
    Email:
    <input 
        type='email'
        required
        placeholder='email'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
    />
    <br></br>
     Otp:
    <input 
        type='text'
        required
        placeholder='email'
        value={otp}
        onChange={(e)=>setOtp(e.target.value)}
    />
    <br></br>
    <button disabled={submitting}>{submitting ? 'verifing...':'sign up'}</button>

    </form>
    {msg &&<p>msg</p>}
    <p>
        <Link to='/request-otp'>Request Otp</Link>
    </p>

  </>
}

export default Verifyotp