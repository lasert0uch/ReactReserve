import { Card } from 'semantic-ui-react';

function ProductList({ products }) {
  function mapProductsToItems(products) {
    return products.map(product => ({ // Can add instance for ID's here
      header: product.name,
      image: product.mediaUrl,
      meta: `Price: $${product.price}`,
      color: 'teal',
      fluid: true,
      childKey: product._id,
      href: `/product?_id=${product._id}`,
    }))
  }

  return (
    <Card.Group
      stackable
      itemsPerRow="3"
      centered
      items={mapProductsToItems(products)} />
  );
}

export default ProductList;
