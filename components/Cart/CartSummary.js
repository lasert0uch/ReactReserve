import StripeCheckout from 'react-stripe-checkout';
import calculateCartTotal from '../../utils/calculateCartTotal';
import { Button, Segment, Divider } from 'semantic-ui-react';
import React from 'react';

function CartSummary({ products, handleCheckout, success }) {
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
      <StripeCheckout
        name="ReactReserve"
        amount={stripeAmount}
        image={products.length > 0 ? products[0].product.mediaUrl : ''}
        currency="USD"
        shippingAddress={true}
        billingAddress={true}
        zipCode={true}
        stripeKey="pk_test_51JXaaTL2eBcp1fN7xowRL59JJqucBJpHpcQlfvUJjbJJgCHfrwPN14XZLTu5LaH0yyQftldpJgSqA0gchP5orm4K00EJ94ZIVQ"
        // stripeKey="pk_live_51JXaaTL2eBcp1fN70hARbvwEkfG8h2FUoJ547T5JEzv6ihTzC29dbVZidz4kWFm2DZ4WmmYReeTXcDV7s5wgtnzk00aPxjh8Km"
        token={handleCheckout}
        triggerEvent='onClick'
      >
        <Button
          disabled={isCartEmpty || success}
          icon="cart"
          color="teal"
          floated="right"
          content="checkout"
        />
      </StripeCheckout>

    </Segment>

  </>)
}

export default CartSummary;
