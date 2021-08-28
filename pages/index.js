import React from 'react';
import axios from 'axios';

function Home({ products }) {
  console.log(products)
  // React.useEffect(() => {
  //   getProducts()
  // }, [])

  // async function getProducts() {
  //   const url = 'http://localhost:3000/api/products'
  //   const response = await axios.get(url)
  //   console.log(response.data)
  // }

  return <>home</>;
}

Home.getInitialProps = async () => {
  // Fetch API Data
  //Return Response data
  const url = 'http://localhost:3000/api/products'
  const response = await axios.get(url)

  return { products: response.data }
  // note: this object will be merged with existing props


}

export default Home;
