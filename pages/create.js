import { Form, Input, TextArea, Button, Image, Message, Header, Icon } from 'semantic-ui-react';
import React from 'react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import catchError from '../utils/catchErrors';
const INITIAL_PRODUCT = {
  name: "",
  price: "",
  media: "",
  description: "",
}

function CreateProduct() {
  const [product, setProduct] = React.useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [error, setError] = React.useState('');


  React.useEffect(() => {
    const isProduct = Object.values(product).every(el => Boolean(el));
    isProduct ? setDisabled(false) : setDisabled(true);
  }, [product])

  function handleChange(event) {
    const { name, value, files } = event.target;
    if (name === 'media') {
      setProduct(prevState => ({ ...prevState, media: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]))
    } else {
      setProduct(prevState => ({ ...prevState, [name]: value }));
    }
  }

  async function handleImageUpload() {
    const data = new FormData();
    data.append('file', product.media);
    data.append('upload_preset', 'ReactReserve');
    data.append('cloud_name', 'dbof5r0y2');
    const response = await axios.post(process.env.CLOUDINARY_URL, data);
    const mediaUrl = response.data.url;
    return mediaUrl;
  }

  async function handleSubmit(event) {
    try {
      console.log('handleSubmit() Try');
      event.preventDefault();
      setLoading(true);
      setError('');
      const mediaUrl = await handleImageUpload();
      console.log({ mediaUrl }) // Logs mediaUrl from Cloudinary on Submit
      const url = `${baseUrl}/api/product`;
      const { name, price, description } = product;
      const payload = { name, price, description, mediaUrl };
      if (!name || !price || !description || !mediaUrl) {
        console.log(
          { name: name, price: price, description: description, mediaUrl: mediaUrl, url: url }
        )
      }
      const response = await axios.post(url, payload);
      // console.log({ response }) // Logs Response from API
      setMediaPreview('');
      setProduct(INITIAL_PRODUCT);
      setSuccess(true);
    } catch (error) {
      catchError(error, setError)
    } finally {
      setLoading(false);

    }
  }


  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form loading={loading} error={Boolean(error)} success={success} onSubmit={handleSubmit}>
        <Message
          error
          header="Oops!"
          content={error}
        />
        <Message
          success
          icon="check"
          header="Success!"
          content="Your product has been added to the collection."
        />
        <Image src={mediaPreview} rounded centered size="small" />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            id="txtName"
            placeholder="Name"
            type="text"
            value={product.name}
            required
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="price"
            label="Price"
            id="txtPrice"
            placeholder="Price"
            type="number"
            min="0.99"
            step="1.00"
            value={product.price}
            required
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="media"
            content="Select Image"
            label="Media"
            id="mediaFile"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Description"
          id="txtAreaDescription"
          value={product.description}
          required
          onChange={handleChange}
        />
        <Form.Field
          control={Button}
          disabled={disabled || loading}
          color="blue"
          icon="pencil alternate"
          content="Submit"
          type="Submit"
          id="btnSubmit"
        />

      </Form>

    </>
  )
}

export default CreateProduct;
