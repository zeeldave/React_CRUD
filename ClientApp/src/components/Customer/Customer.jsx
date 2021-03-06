import React, { Component } from "react";
import axios from "axios";
import { Table, Button, Icon } from "semantic-ui-react";
import NewCustomerModal from "./NewCustomerModal";
import UpdateCustomerModal from "./UpdateCustomerModal";

export class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      loaded: false,
      openCreateModal: false,
      openUpdateModal: false,
      customer: {},
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get("/Customers/GetCustomer/")
      .then((res) => {
        console.log(res.data);
        this.setState({
          customers: res.data,
          loaded: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  toggleModal = () => {
    this.setState({
      openCreateModal: !this.state.openCreateModal,
    });
  };

  deleteCustomer = (id) => {
    axios
      .delete(`/Customers/DeleteCustomer/${id}`)
      .then((res) => {
        console.log(res);
        alert("Customer record Deleted..!");
        this.fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  toggleUpdateModal = (customer) => {
    this.setState({
      openUpdateModal: !this.state.openUpdateModal,
      customer: !this.state.openUpdateModal ? customer : {},
    });
  };

  // toggleUpdateModal = (customer) => {
  //   this.setState({
  //     openUpdateModal: !this.state.openUpdateModal,
  //     customer: customer,
  //   });
  // };

  render() {
    const customers = this.state.customers;
    const loaded = this.state.loaded;
    const openCreateModal = this.state.openCreateModal;
    const openUpdateModal = this.state.openUpdateModal;
    const customer = this.state.customer;

    if (loaded) {
      return (
        <div>
          <NewCustomerModal
            open={openCreateModal}
            toggleModal={this.toggleModal}
            fetchData={this.fetchData}
          />

          <UpdateCustomerModal
            open={openUpdateModal}
            toggleModal={this.toggleUpdateModal}
            fetchData={this.fetchData}
            customer={customer}
          />

          <h1>Customers</h1>
          <Button color="blue" onClick={this.toggleModal}>
            Create New Customer
          </Button>
          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Address</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {customers.map((c) => {
                return (
                  <Table.Row key={c.id}>
                    <Table.Cell>{c.name}</Table.Cell>
                    <Table.Cell>{c.address}</Table.Cell>
                    <Table.Cell>
                      <Button
                        icon
                        labelPosition="left"
                        color="yellow"
                        onClick={() => this.toggleUpdateModal(c)}
                      >
                        <Icon name="edit" />
                        Update
                      </Button>
                      <Button icon labelPosition="right" color="red"
                        onClick={() => this.deleteCustomer(c.id)}>
                        Delete
                        <Icon name="trash" />
                      </Button>
                      
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      );
    } else {
      return (
        <div>
          <p>Loading.......</p>
        </div>
      );
    }
  }
}
