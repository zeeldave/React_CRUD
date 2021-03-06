import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import axios from "axios";

const NewCustomerModal = (props) => {
  const { open, toggleModal, fetchData } = props;
  const [name, setname] = useState();
  const [address, setaddress] = useState();
 

  useEffect(() => {
    console.log(name);
    //   return () => {
    //     console.log("Function component unmount")
    //   }
  }, [name]);

  // const test = (e) => {
  //   console.log(e.target.value);
  // };

  const createStore = () => {
    debugger;
    if (!name || !address) {
      alert("Please enter all Details!");
    } else {
      axios
        .post("/Stores/PostStore", {
          name: name,
          address: address
        })
        .then((res) => {
          console.log(res);
          fetchData();
          toggleModal();
          alert("New Store Created...");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Modal open={open}>
      <Modal.Header>Create New Store</Modal.Header>
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
            <label>Address</label>
            <input
              placeholder="Please Enter Address"
              onChange={(e) => setaddress(e.target.value)}
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
          onClick={() => createStore()}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default NewCustomerModal;
