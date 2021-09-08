import calculateCartTotal from '../../utils/calculateCartTotal';
import { Button, Segment, Divider } from 'semantic-ui-react';
import React from 'react';

function CartSummary({ products }) {
  const [isCartEmpty, setCartEmpty] = React.useState(false);
  const [cartAmount, setCartAmount] = React.useState(0);
  const [stripeAmount, setStripeAmount] = React.useState(0);

  React.useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
    setCartEmpty(products.length === 0);
  }, [products]);

  return (<>
    <Divider />
    <Segment clearing size="large">
      <strong>Sub total:</strong>{` $${cartAmount}`}
      <Button
        disabled={isCartEmpty}
        icon="cart"
        color="teal"
        floated="right"
        content="checkout"
      />

    </Segment>

  </>)
}

export default CartSummary;
