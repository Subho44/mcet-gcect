import React,{useState} from 'react'
import api from '../api'

const Requestotp = () => {
    const [email,setEmail] = useState('');
    const [sending,setSending] = useState(false);
    const [msg,setMsg] = useState('');

    const sendOtp = async(e) => {
        e.preventDefault();
        setMsg('');
        setSending(true);

        try {
            const {data} = await api.post('/api/auth/request-otp',{email});
            setMsg(data ?.message || 'OTP SENT');
        } catch(err) {
            console.error(err);
        }
    }
  return <>
    <h2>Request otp</h2>
    <form onSubmit={sendOtp}>
    Email:
    <input 
        type='email'
        required
        placeholder='email'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
    />
    <br></br>
    <button disabled={sending}>{sending ? 'Sending...':'send otp'}</button>

    </form>
    {msg &&<p>msg</p>}

  </>
}

export default Requestotp