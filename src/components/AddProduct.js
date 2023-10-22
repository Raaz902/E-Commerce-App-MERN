import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);

    const navigate= useNavigate(false);


    const addProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }
        console.log(name, price, category, company)
        const userId = JSON.parse(localStorage.getItem('user'))._id
        //console.log(userId)
        let result = await fetch("http://localhost:8000/addproduct", {
            method: "post",
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        //console.log(result);
        setName('')
        setPrice('')
        setCategory('')
        setCompany('')
        navigate('/')
    }
    return (
        <div className='signUp-Div'>
            <h1>Add Product</h1>
            <div style={{ display: "flex" }}>
                <input id='add_product' className='inputBox' type="text" placeholder='Enter Product Name' value={name} onChange={(e) => setName(e.target.value)} />
                {!name & error ? <span className='validation'>Enter valid name</span> : null}
            </div>
            <div style={{ display: "flex" }}>
                <input className='inputBox' type="text" placeholder='Enter Product Price' value={price} onChange={(e) => setPrice(e.target.value)} />
                {!price && error ? <span className='validation' >Enter valid price</span> : null}
            </div>
            <div style={{ display: "flex" }}>
                <input className='inputBox' type="text" placeholder='Enter Product Category' value={category} onChange={(e) => setCategory(e.target.value)} /> {!category & error ? <span className='validation' >Enter valid category</span> : null}
            </div>
            <div style={{ display: "flex" }}>
                <input className='inputBox' type="text" placeholder='Enter Product Company Name' value={company} onChange={(e) => setCompany(e.target.value)} /> {!company & error ? <span className='validation' >Enter valid company</span> : null}
            </div>

            <button onClick={addProduct} className='button' type='button'> Add Product</button>
        </div >
    )
}
