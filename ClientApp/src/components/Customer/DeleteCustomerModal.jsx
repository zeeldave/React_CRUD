import React, { useState, useEffect } from "react";
import { Label, Form, Button, Header, Image, Modal, Table } from "semantic-ui-react";
import axios from "axios";

const DeleteCustomerModal = (props) => {
  const { open, toggleDeleteModal, fetchData, customer, sales } = props;

  const deleteCustomer = (id) => 
  {   
        axios
        .delete(`/Customers/DeleteCustomer/${id}`)
        .then(function (res) {
          console.log(res);
          fetchData();
          toggleDeleteModal();
        })
        .catch(function (err) {
          alert("Customer existing in sales so can not get deleted..!!");
          console.log(err.response.data);
        });
};



   

  return (
    <Modal
     open={open}
     >
      <Modal.Header>Are you sure you want to Delete Customer ?</Modal.Header>
    
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
                <Table.Cell>{customer.name}</Table.Cell>
                <Table.Cell>{customer.address}</Table.Cell>
                </Table.Row>
            </Table.Body>
            </Table>

          {/* <Header>Customer Details</Header> */}
    
        </Modal.Description>
      <Modal.Actions>
        <Button color='black' onClick={() => toggleDeleteModal()}>
          Cancel
        </Button>
        
        {/* {sales.map((s) => {
          // debugger;
          console.log(customer.id);
          if(customer.id==s.customer.id)
          {
       alert("Can not get deleted..");
 } 
})} */}

  <Button
  content="Yes"
  color='black'
  icon='delete'
  onClick={() => deleteCustomer(customer.id)}
  negative
/>
 
      
      </Modal.Actions>
    </Modal>
 
  );
};

export default DeleteCustomerModal;
