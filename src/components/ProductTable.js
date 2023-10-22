import React, { useEffect, useState, } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ProductTable({ products, deleteProduct, sendData }) {
    const navigate = useNavigate();
    return (
        <div>
            <table className='product_table '>
                <thead>
                    <tr>
                        <th>Sl. No.</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Company</th>
                        <th colSpan={2} >Operations</th>

                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index} style={{ textAlign: "center" }}>
                            <td >{index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.company}</td>
                            <td><button onClick={
                                async () => {
                                    const result = await deleteProduct(product._id);
                                   // alert("Product " + product.name + " has been deleted");
                                    console.log(result);
                                }
                            }>Delete</button></td>
                            <td><button onClick={async () => {
                                sendData(product);
                                navigate('/update');                

                            }}
                            >Edit</button></td>
                        </tr>
                    ))}
                </tbody>

            </table>
            <div>

            </div>
        </div>
    );

}
