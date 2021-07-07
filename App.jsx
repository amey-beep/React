import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';



function App() {
  const [userName,setUserName] = useState('');
  const [phoneN,setPhoneNo] = useState('');
  const [contactList,setContactList]=useState([]);
  const [newPhone,setNewPhone]=useState('');
  let uniqueKey=0;
  
  const updateContact=(oldPhone)=>{
    if (newPhone===""){
      alert("Please enter the phone number");
    }
    else{
    Axios.put("http://localhost:3001/api/updateContact",
    {newphone:newPhone,
     oldphone:oldPhone
  });
  setNewPhone("");
   }
  };

  useEffect(()=>{
    Axios.get('http://localhost:3001/api/show').then((response)=>{
      setContactList(response.data);
    });
  },[]);
  
  const deleteContact=(phone)=>{
    Axios.delete(`http://localhost:3001/api/delContact/${phone}`);
    
  };

  const addContact=()=>{
    if(userName===""||phoneN===""){
      alert("Please fill all the details");
    }
    else{
    Axios.post('http://localhost:3001/api/addContact',
   {
      uN:userName,
      pN:phoneN,
    });
      setContactList([...contactList,
      {Name:userName,Phone_No:phoneN},
    ]);
  }
  };

  return (
    <div className="App">
      <h1>CONTACT LIST</h1>
      <div className="name">
        <label>Name : </label><br/>
        <input type="text" className="uname" onChange={(e)=>{
            setUserName(e.target.value)
        }}/>
         <br/>
           <label>Phone No :</label><br/>
           <input type="number" className="phoneno" onChange={(e)=>{
               setPhoneNo(e.target.value)
           }}/>
    </div>
       <br/>
       <button onClick={addContact}>ADD CONTACT</button>
       <br/>
        <table className='table'>
          <tbody>
       {contactList.map((val)=>{
           return (
                       <tr className="tr" key={uniqueKey}>
                       <td><button onClick={()=>{deleteContact(val.Phone_No)}}>Delete</button></td>
                       <td className="td">{val.Name}</td>          
                       <td className="td">{val.Phone_No}</td>      
                       <td><input type='number' className="updateInput" onChange={(e)=>{
                              setNewPhone(e.target.value)
                           }}/>
                       <button onClick={()=>{updateContact(val.Phone_No)}}>Update</button></td>
                       </tr>
           );
       })}
       </tbody>
      </table>
    </div>
  );

}

export default App;