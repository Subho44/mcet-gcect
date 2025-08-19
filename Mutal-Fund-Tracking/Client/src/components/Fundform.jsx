import React, { useState } from 'react'
import {Form,Button,Card} from "react-bootstrap";
import axios from 'axios';
const Fundform = ({refreshfunds}) => {

const [fundname,setFundname] = useState("");
const [fundtype,setFundtype] = useState("");
const [amountinvested,setAmountinvested] = useState("");
const [returns,setReturns] = useState("");

const hs = (e)=>{
    e.preventDefault();
    const newFund = {fundname,fundtype,amountinvested,returns};
    axios.post("http://localhost:5800/api/funds/add",newFund)
    .then(()=>{
        refreshfunds();
        setFundname("");
        setFundtype("");
        setAmountinvested("");
        setReturns("");
    })
    .catch((err)=>console.error('error',err));

};

  return <>
    <Card className='m-4 p-4 shadow'>
    <h3 className='mb-3'>Add Mutual Fund</h3>
   <Form onSubmit={hs}>
   <Form.Group className='mb-3'>
    <Form.Label>Fund Name</Form.Label>
    <Form.Control 
        type='text'
        placeholder='enter fund name'
        value={fundname}
        onChange={(e)=>setFundname(e.target.value)}
        required
    />
   </Form.Group>
    <Form.Group className='mb-3'>
    <Form.Label>Fund Type</Form.Label>
    <Form.Control 
        type='text'
        placeholder='enter fund type'
        value={fundtype}
        onChange={(e)=>setFundtype(e.target.value)}
        required
    />
   </Form.Group>
   <Form.Group className='mb-3'>
    <Form.Label>Amount Invested</Form.Label>
    <Form.Control 
        type='number'
        placeholder='enter amount'
        value={amountinvested}
        onChange={(e)=>setAmountinvested(e.target.value)}
        required
    />
   </Form.Group>
    <Form.Group className='mb-3'>
    <Form.Label>Returns(%)</Form.Label>
    <Form.Control 
        type='number'
        placeholder='enter returns'
        value={returns}
        onChange={(e)=>setReturns(e.target.value)}
        required
    />
   </Form.Group>
   <Button type='submit' variant='primary' className='w-100'>
   Add Fund
   </Button>

   </Form>    
 </Card>
  </>
}

export default Fundform