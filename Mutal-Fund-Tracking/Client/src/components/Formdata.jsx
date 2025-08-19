import React from 'react'

const Formdata = () => {

  return <>
    <form>
        name:<input
             type='text'
             placeholder='enter name'
             required
        />
        <button type='submit'>Submit</button>
    </form>
  </>
}

export default Formdata