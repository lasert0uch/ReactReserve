import React from 'react';
import axios from 'axios';
import ProductsList from '../components/Index/ProductList';

function Home({ products }) {

  return <ProductsList products={products} />;
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
