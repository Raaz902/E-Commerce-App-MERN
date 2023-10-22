import React, { useEffect, useState } from 'react';
import ProductTable from './ProductTable';

export default function ProductList({ sendData2}) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getProducts();
                console.log(result)
               
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchData();
    }, []);
    const getProducts = async () => {
        let result = await fetch('http://localhost:8000/products');
        result = await result.json();
        setProducts(result);
        return result;
    }
    var deleteProduct = async (data) => {
        const result = await fetch(`http://localhost:8000/delete/${data}`, {
            method: "DELETE"
        });
        getProducts();
        return result.ok;
    }
    function sendData(updatingData) {
        sendData2(updatingData);
    }

    const searchProducts = async (e) => {
        const response = await fetch(`http://localhost:8000/search/${e.target.value}`);
        const data = await response.json();
        console.log(data);
        setProducts(data);
       
    }
    return (
        <div style={{ alignItems: "center" }}>

            <h2 style={{ textAlign: "center", marginTop: "10px" }}>Product List</h2>
            <div className='search' >
                <input onChange={searchProducts} type="text" className="input" placeholder='Search Products by Name, Category or Company name ' />
            </div>
            <ProductTable products={products} deleteProduct={deleteProduct} sendData={sendData} />


        </div>
    )
}
