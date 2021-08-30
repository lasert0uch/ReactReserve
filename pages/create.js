import { Form, Input, TextArea, Button, Image, Message, Header, Icon } from 'semantic-ui-react';

function CreateProduct() {
  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            id="txtName"
            placeholder="Name"
            type="text"
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
          />
          <Form.Field
            control={Input}
            name="media"
            content="Select Image"
            label="Media"
            id="mediaFile"
            type="file"
            accept="image/*"
          />
        </Form.Group>
        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Description"
          id="txtAreaDescription"
        />
        <Form.Field
          control={Button}
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
