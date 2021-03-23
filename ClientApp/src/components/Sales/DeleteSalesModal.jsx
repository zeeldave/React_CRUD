import React, { useState, useEffect } from "react";
import {
  Label,
  Form,
  Button,
  Header,
  Image,
  Modal,
  Table,
} from "semantic-ui-react";
import axios from "axios";

const DeleteSalesModal = (props) => {
  const {
    open,
    toggleDeleteModal,
    fetchData,
    sale,
    customers,
    stores,
    products,
    sales,
  } = props;

  const deleteSales = (id) => {
    axios
      .delete(`/Sales/DeleteSales/${id}`)
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
    <Modal open={open} size='tiny'>
      <Modal.Header>Delete Sale</Modal.Header>
      <Modal.Content> Are you sure you want to Delete Sale?</Modal.Content>

      <Modal.Actions>
        <Button color="black" onClick={() => toggleDeleteModal()}>
          Cancel
        </Button>
        <Button
          content="Yes"
          color="black"
          icon="checkmark"
          onClick={() => deleteSales(sale.id)}
          negative
        />
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteSalesModal;
