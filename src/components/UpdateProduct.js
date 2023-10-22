import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UpdateProduct({ Update }) {
    console.log("Raaz");
    const navigate = useNavigate();

    // console.log(Update)
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (Update) {
            setName(Update.name);
            setPrice(Update.price);
            setCategory(Update.category);
            setCompany(Update.company);
        }else{
            navigate('/')
        }
    }, [])



    const updateProduct = async () => {
        //  console.log(!name)
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }
        console.log(name, price, category, company)
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        //console.log(userId)
        let result = await fetch(`http://localhost:8000/update/${Update._id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, price, category, userId, company })
        });
        navigate('/')
        result = await result.json();
        //console.log(result);
    }
    return (
        <div className='signUp-Div'>
            <h1>Update Product</h1>
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
            <button onClick={updateProduct} className='button' type='button'> Add Product</button>
        </div >
    )
}
