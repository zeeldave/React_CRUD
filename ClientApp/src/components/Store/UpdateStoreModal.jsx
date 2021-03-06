import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import axios from "axios";

const UpdateStoreModal = (props) => {
  const { open, toggleModal, fetchData, store } = props;
  const [name, setname] = useState();
  const [address, setaddress] = useState();
  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    if (Object.keys(store).length !== 0 && store.constructor === Object && !loaded) {
      setname(store.name);
      setaddress(store.address);
      setloaded(true);
    }
  });

  const cancel = () => {
    setname();
    setaddress();
    setloaded(false);
    toggleModal();
  };

  const updateStore = (id) => {
    if (store == undefined) {
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
          alert("Store Updated..!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  

  if (store) {
    return (     
      <Modal open={open}>
        <Modal.Header>Update Store Details</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Name</label>
              <input
                placeholder="Please Enter Name"
                onChange={(e) => setname(e.target.value)}
                value={store.name}
              />
            </Form.Field>
            <Form.Field>
              <label>Address</label>
              <input
                placeholder="Please Enter Address"
                onChange={(e) => setaddress(e.target.value)}
                value={store.address}
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
            onClick={() => updateStore(store.id)}
            positive
          />
        </Modal.Actions>
      </Modal>
    );
  } else {
    return <div></div>;
  }
};

export default UpdateStoreModal;
