import React, { useState, useEffect } from "react";
import { Label, Form, Button, Header, Image, Modal, Table } from "semantic-ui-react";
import axios from "axios";

const DeleteProductModal = (props) => {
  const { open, toggleDeleteModal, fetchData, product } = props;

  const deleteProduct = (id) => {
    // alert("If Product is existing in Sales can't get Deleted..!");
    axios
    .delete(`/Products/DeleteProduct/${id}`)
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
      <Modal.Header>Are you sure you want to Delete Product ?</Modal.Header>
    
        <Modal.Description>
        <Table color="red">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
            <Table.Row>
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell>${product.price}</Table.Cell>
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
          onClick={() => deleteProduct(product.id)}
          negative
        />
      </Modal.Actions>
    </Modal>
 
  );
};

export default DeleteProductModal;
