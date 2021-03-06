import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import axios from "axios";

const NewProductModal = (props) => {
  const { open, toggleModal, fetchData } = props;
  const [name, setname] = useState();
  const [price, setprice] = useState();

  useEffect(() => {
    console.log(name);
    //   return () => {
    //     console.log("Function component unmount")
    //   }
  }, [name]);

  // const test = (e) => {
  //   console.log(e.target.value);
  // };

  const createProduct = () => {
    if (!name || !price) {
      alert("Please enter all Details!");
    } else {
      axios
        .post("/Products/PostProduct", {
          name: name,
          price:price
        })
        .then((res) => {
          console.log(res);
          fetchData();
          toggleModal();
          alert("New Product Created...");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Modal open={open}>
      <Modal.Header>Create New Product</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field required>
            <label>Name</label>
            <input
              placeholder="Please Enter Name"
              onChange={(e) => setname(e.target.value)}
            />
          </Form.Field>
          <Form.Field required>
            <label>Price</label>
            <input
              placeholder="Please Enter Price"
              onChange={(e) => setprice(e.target.value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => toggleModal()}>
          Cancel
        </Button>
        <Button
          content="Submit"
          labelPosition="right"
          icon="checkmark"
          onClick={() => createProduct()}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default NewProductModal;
