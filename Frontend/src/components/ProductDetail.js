import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'

export default function ProductDetail() {
    const description = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab beatae hic suscipit deserunt nulla, culpa voluptatibus excepturi sunt quia fugit repellendus, ipsum earum officia quos voluptatum ducimus, labore aliquid eaque ipsam blanditiis nam tempore voluptas sequi! Iure quam eveniet illo laboriosam quos, animi dolore culpa excepturi molestias praesentium magnam consectetur sit quas ipsum quo at ea maiores deserunt voluptates enim?"

    
    const { productId } = useParams();
    const [details, setDetails] = useState()
    useEffect(() => {
        fetchDetails();
    }, [])


    const fetchDetails = async () => {
        const response = await fetch(`http://localhost:8000/product_details/${productId}`)

        if (response.ok) {
            const data = await response.json();
            console.log(data);

            setDetails(data[0]); // Update the details state with the fetched data
        } else {
            console.error('Failed to fetch product details');
        }
    }

    return (
        <div className="product-detail">
        {details ? <img src="https://picsum.photos/id/1/250/267" alt={details.name} /> : null}
        <div className="product-info">
          {details ? <h2><b>{details.name}</b></h2> : null}
          {details ? <p><b>Price:</b> ${details.price}</p> : null}
          {details ? <p><b>Category:</b> {details.category}</p> : null}
          {details ? <p><b>Company:</b> {details.company}</p> : null}
          {details ? <p><b>Description:</b> {description}</p> : null}
        </div>
      </div>
      

        /*    <div className="product-detail">
               {details ? <h2><b>{details.name}</b></h2> : null}
               {details ? <p><b>Price:</b> ${details.price}</p> : null}
               {details ? <p><b>Category:</b> {details.category}</p> : null}
               {details ? <p><b>Company:</b> {details.company}</p> : null}
               {details ? <p><b>Description:</b> {description}</p> : null}
           </div> */
    )
}
