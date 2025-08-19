import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Fundform from '../components/Fundform'
import Producttable from '../components/Producttable'
import { Container } from 'react-bootstrap'

const Service = () => {
  const [funds,setFunds] = useState([]);
  const fetchfunds = ()=>{
    axios.get("http://localhost:5800/api/funds")
    .then((res)=>setFunds(res.data))
    .catch((err)=>console.error("error",err));
  };
  useEffect(()=>{
    fetchfunds();
  },[]);

  return <>
  <Container className=''>
  <h1 className='text-center mb-4'>Mutual Fund Tracker</h1>
   <Fundform refreshfunds={fetchfunds}/>
   <Producttable funds ={funds}/>
   </Container>
  </>
}

export default Service