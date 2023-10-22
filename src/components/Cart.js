import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
export default function Cart() {
    const { productIds } = useParams();
    const [details, setDetails] = useState([]);
    const productIdsArray = productIds.split(',');
    // console.log(productIdsArray);

    useEffect(() => {
        const fetchDetails = async () => {
            if (productIdsArray.length > 0) {
                const detailsArray = [];

                for (let i = 0; i < productIdsArray.length; i++) {
                    const response = await fetch(`http://localhost:8000/product_details/${productIdsArray[i]}`);
                    if (response.ok) {
                        const data = await response.json();
                        detailsArray.push(data);
                        const flatedArray = detailsArray.flat();
                        setDetails(flatedArray);
                    }
                }

            }
        };

        fetchDetails();
    }, []);
    console.log(details)

    useEffect(() => {
        // console.log(details);
    }, [details]);

    return (
        <div>
            <h2 style={{ marginLeft: "580px", marginTop: "10px" }}>Cart items</h2>

            <table className='product_table '>
                <thead>
                    <tr>
                        <th>Sl. No.</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Company</th>
                    </tr>
                </thead>
                <tbody>
                    {details.map((product, index) => (
                        <tr key={index} style={{ textAlign: "center" }}>
                            <td >{index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.company}</td>
                        </tr>
                    ))}
                </tbody>

            </table>


        </div>
    )
}
