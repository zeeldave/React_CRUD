import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import axios from "axios";

const UpdateCustomerModal = (props) => {
  const { open, toggleModal, fetchData, customer } = props;
  const [name, setname] = useState();
  const [address, setaddress] = useState();
  const [loaded, setloaded] = useState(false);

  // useEffect(() => {
  //   if (!loaded) {
  //     setname(customer.name);
  //     setaddress(customer.address);
  //     setloaded(true);
  //   }
  // });


  useEffect(() => {

    if (Object.keys(customer).length !== 0 && customer.constructor === Object && !loaded) {
      setname(customer.name);
      setaddress(customer.address);
      setloaded(true);
    }
  });


  const cancel = () => {
    setname();
    setaddress();
    setloaded(false);
    toggleModal();
  };


  useEffect(() => {
    console.log(name);
    //   return () => {
    //     console.log("Function component unmount")
    //   }
  }, [name]);

  const updateCustomer = (id) => {
    if (customer == undefined) {
      alert("Something Wrong.");
    } else {
      axios
        .put(`/Customers/PutCustomer/${id}`, {
          id: id,
          name: name,
          address: address,
        })
        .then((res) => {
          console.log(res);
          fetchData();
          toggleModal();
          alert("Customer Updated..!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (name || address) {
    return (
      <Modal open={open}>
        <Modal.Header>Update Customer Details</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Name</label>
              <input
                placeholder="Please Enter Name"
                onChange={(e) => setname(e.target.value)}
                value={name}
              />
            </Form.Field>
            <Form.Field>
              <label>Address</label>
              <input
                placeholder="Please Enter Address"
                onChange={(e) => setaddress(e.target.value)}
                value={address}
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
            onClick={() => updateCustomer(customer.id)}
            positive
          />
        </Modal.Actions>
      </Modal>
    );
  } else {
    return <div></div>;
  }
};

export default UpdateCustomerModal;
