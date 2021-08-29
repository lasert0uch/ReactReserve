import { Card } from 'semantic-ui-react';

function ProductList({ products }) {
  function mapProductsToItems(products) {
    return products.map(product => ({
      header: product.name,
      image: product.mediaUrl,
      meta: `Price: $${product.price}`,
      color: 'teal',
      fluid: false,
      childKey: product._id,
      // href: `/product?_id=${product._id}`,
      href: `https://www.google.com`,
      target: '_blank'

    }))
  }

  return <Card.Group items={mapProductsToItems(products)} />;
}

export default ProductList;
