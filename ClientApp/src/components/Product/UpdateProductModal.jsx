import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import axios from "axios";

const UpdateProductModal = (props) => {
  const { open, toggleModal, fetchData, product } = props;
  const [name, setname] = useState();
  const [price, setprice] = useState();
  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    if (Object.keys(product).length !== 0 && product.constructor === Object && !loaded) {
      setname(product.name);
      setprice(product.price);
      setloaded(true);
    }
  });
  const cancel = () => {
    setname();
    setprice();
    setloaded(false);
    toggleModal();
  };

  const updateProduct = (id) => {
    if (product == undefined) {
      alert("Something Wrong.");
    } else {
      axios
        .put(`/Products/PutProduct/${id}`, {
          id: id,
          name: name,
          price:price,
        })
        .then((res) => {
          console.log(res);
          fetchData();
          toggleModal();
          alert("Product Updated..!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  

  if (product) {
    return (     
      <Modal open={open}>
        <Modal.Header>Update Product Details</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Name</label>
              <input
                placeholder="Please Enter Name"
                onChange={(e) => setname(e.target.value)}
                value={product.name}
              />
            </Form.Field>
            <Form.Field>
              <label>Price</label>
              <input
                placeholder="Please Enter Price"
                onChange={(e) => setprice(e.target.value)}
                value={product.address}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={cancel}>
            Cancel
          </Button>
          <Button
            content="Submit"
            labelPosition="right"
            icon="checkmark"
            type="submit"
            onClick={() => updateProduct(product.id)}
            positive
          />
        </Modal.Actions>
      </Modal>
    );
  } else {
    return <div></div>;
  }
};

export default UpdateProductModal;
