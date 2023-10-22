import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Products() {
    const [data, setCardData] = useState();
    const [filteredCategory, setCategory] = useState();
    const [productIds, setProductId] = useState([]);
    console.log(filteredCategory);
    useEffect(() => {
        const fetchData = async () => {
            const result = await getProducts();
            setCardData(result);
        }
        fetchData();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:8000/products');
        result = await result.json();

        return result;

    }
    if (data) {
        var selectedCategory = ["Select category"];
        for (var i = 0; i < data.length; i++) {
            selectedCategory.push(data[i].category);
        }
        // Remove duplicates using a Set
        selectedCategory = [...new Set(selectedCategory)];

    }

    function selectCategory(e) {
        if (e.target.value == "Select category") {
            var filteredData = data.filter((product) => product);
            setCategory(filteredData);
        } else {
            var filteredData = data.filter((product) => product.category == e.target.value);
            setCategory(filteredData);

        }
    }


    function sendId(_id) {
        setProductId(prevProductIds => [...prevProductIds, _id]);
        console.log(_id);
    }



    console.log(productIds)


    return (
        <div style={{marginBottom:"40px"}}>
            <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: "50px", paddingRight: "50px" }}>
                <h2 style={{ marginLeft: "400px", marginTop: "10px" }}>Products List in Card Form</h2>
                <Link to={`/cart/${productIds}`}>
                    <button style={{ minWidth: "50px" }}>
                        Items in Cart (
                        <b>
                            {productIds.length > 0 ? productIds.length : 0}
                        </b>)
                    </button>
                </Link>
            </div>
            {data ? <select name="category" id="categorySelect" style={{ marginLeft: "500px", height: "30px", width: "200px", textAlign: "center", border: "2px solid skyblue" }} onChange={selectCategory}>

                {selectedCategory.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select> : null}

            <div style={{ display: 'flex', flexWrap: 'wrap', paddingLeft: "80px" }}>
                {(data && !filteredCategory) ? data.map((product, index) => (

                    <div key={index} style={{ flexBasis: '20%', margin: '10px' }}>
                        <Link to={`/product_details/${product._id}`} >
                            <img style={{ borderRadius: "5%" }} src={`https://picsum.photos/id/${index}/250/267`} alt='image' />
                        </Link>
                        <div style={{ display: 'flex', justifyContent: "space-between", paddingLeft: "20px", paddingRight: "20px" }}>
                            <div ><h4 style={{ marginBlock: "0px" }}>{product.name}</h4></div>
                            <div ><h5 style={{ marginBlock: "0px" }}>{product.price}</h5></div>
                            <div >
                                <button onClick={(e) => { sendId(product._id) }} style={{ marginBlock: "0px" }}>+Cart</button>
                                {/*     <Link to={`/cart/${product._id}`}><button style={{ marginBlock: "0px" }}>+Cart</button></Link> */}
                            </div>
                        </div>
                    </div>
                )) : null
                }
                {(data && filteredCategory) ? filteredCategory.map((product, index) => (

                    <div key={index} style={{ flexBasis: '20%', margin: '10px' }}>
                        <Link to={`/product_details/${product._id}`} >
                            <img style={{ borderRadius: "5%" }} src={`https://picsum.photos/id/${index}/250/267`} alt='image' />
                        </Link>
                        <div style={{ display: 'flex', justifyContent: "space-between", paddingLeft: "20px", paddingRight: "20px" }}>
                            <div ><h4 style={{ marginBlock: "0px" }}>{product.name}</h4></div>
                            <div ><h5 style={{ marginBlock: "0px" }}>{product.price}</h5></div>
                            <div >
                                <button onClick={(e) => { sendId(product._id) }} style={{ marginBlock: "0px" }}>+Cart</button>
                                {/*     <Link to={`/cart/${product._id}`}><button style={{ marginBlock: "0px" }}>+Cart</button></Link> */}
                            </div>
                        </div>
                    </div>
                )) : null
                }
            </div>

        </div >
    );

}









































/* import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Products({ cardData }) {
    const [data, setCardData] = useState();
    const [filteredCategory, setCategory] = useState();
    console.log(filteredCategory);
    useEffect(() => {
        const fetchData = async () => {
            const result = await getProducts();
            // console.log(result)
            setCardData(result);
        }
        fetchData();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:8000/products');
        result = await result.json();
        // setProducts(result);
        return result;
        //console.log(result)
    }
    if (data) {
        var selectedCategory = ["Select categories"];
        for (var i = 0; i < data.length; i++) {
            selectedCategory.push(data[i].category);
            // console.log(typeof data[i].category)
        }
        // Remove duplicates using a Set
        selectedCategory = [...new Set(selectedCategory)];
        // var filtered = data.filter((product) => product.category == selectedCategory[1])
    }

    function selectCategory(e) {
        var filteredData = data.filter((product) => product.category == e.target.value);
        setCategory(filteredData);
    }

    // console.log(data) 



    return (
        <div>
            <h2 style={{ textAlign: "center", marginTop: "10px" }}>Products List in Card Form</h2>
            {data ? <select name="category" id="categorySelect" style={{ marginLeft: "500px", height: "30px", width: "200px", textAlign: "center", border: "2px solid skyblue" }} onChange={selectCategory}>

                {selectedCategory.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select> : null}

            <div style={{ display: 'flex', flexWrap: 'wrap', paddingLeft: "80px" }}>
                {data && !filteredCategory ? data.map((product, index) => (
                    <div key={index} style={{ flexBasis: '20%', margin: '10px' }}>
                        <img style={{ borderRadius: "5%" }} src={`https://picsum.photos/id/${index}/250/267`} alt='image' />
                        <div style={{ display: 'flex', justifyContent: "space-between", paddingLeft: "20px", paddingRight: "20px" }}>
                            <div ><h4 style={{ marginBlock: "0px" }}>{product.name}</h4></div>
                            <div ><h5 style={{ marginBlock: "0px" }}>{product.price}</h5></div>
                        </div>
                    </div>)) : null
                }
                {
                    data && filteredCategory ? filteredCategory.map((product, index) => (
                        <div key={index} style={{ flexBasis: '20%', margin: '10px' }}>
                            <img style={{ borderRadius: "5%" }} src={`https://picsum.photos/id/${index}/250/267`} alt='image' />
                            <div style={{ display: 'flex', justifyContent: "space-between", paddingLeft: "20px", paddingRight: "20px" }}>
                                <div ><h4 style={{ marginBlock: "0px" }}>{product.name}</h4></div>
                                <div ><h5 style={{ marginBlock: "0px" }}>{product.price}</h5></div>
                            </div>
                        </div>
                    )) : null
                }

            </div>
        </div>
    );

} */













