import React, { useState, useEffect } from "react";
import { Label, Form, Button, Header, Image, Modal, Table } from "semantic-ui-react";
import axios from "axios";

const DeleteStoreModal = (props) => {
  const { open, toggleDeleteModal, fetchData, store } = props;

  const deleteStore = (id) => {
    alert("If Store is existing in Sales can't get Deleted..!");
    axios
    .delete(`/Stores/DeleteStore/${id}`)
      .then(function (res) {
        console.log(res);
        fetchData();
        toggleDeleteModal();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <Modal
     open={open}
     >
      <Modal.Header>Are you sure you want to Delete Store ?</Modal.Header>
    
        <Modal.Description>
        <Table color="red">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Address</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
            <Table.Row>
                <Table.Cell>{store.name}</Table.Cell>
                <Table.Cell>{store.address}</Table.Cell>
                </Table.Row>
            </Table.Body>
            </Table>

          {/* <Header>Customer Details</Header> */}
    
        </Modal.Description>
      <Modal.Actions>
        <Button color='black' onClick={() => toggleDeleteModal()}>
          Cancel
        </Button>
        <Button
          content="Yes"
          color='black'
          icon='checkmark'
          onClick={() => deleteStore(store.id)}
          negative
        />
      </Modal.Actions>
    </Modal>
 
  );
};

export default DeleteStoreModal;
