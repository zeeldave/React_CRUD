import React, { Component } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Icon,
  Pagination,
  Dimmer,
  Loader,
  Image,
  Segment,
} from "semantic-ui-react";
import NewCustomerModal from "./NewCustomerModal";
import UpdateCustomerModal from "./UpdateCustomerModal";
import DeleteCustomerModal from "./DeleteCustomerModal";

export class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      loaded: false,
      openCreateModal: false,
      openUpdateModal: false,
      openDeleteModal: false,
      customer: {},
      totalCustomersRec: 0,
      currentPage: 1,
      totalPages: 1,
      sales: [],
    };
  }

  componentDidMount() {
    this.fetchData();
    this.fetchSalesData();
  }

  fetchData = () => {
    axios
      .get("/Customers/GetCustomer/")
      .then((res) => {
        console.log(res.data);
        this.setState({
          customers: res.data,
          loaded: true,
          totalCustomersRec: res.data.length,
          totalPages: Math.ceil(res.data.length / 3),
        });
        if (
          res.data.length % 3 == 0 &&
          this.state.currentPage > Math.ceil(res.data.length / 3)
        ) {
          console.log("Last Page = Current page");
          this.setState({
            currentPage:
              this.state.currentPage == 1 ? 1 : this.state.currentPage - 1,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  fetchSalesData = () => {
    axios
      .get("/Sales/GetSales/")
      .then((res) => {
        console.log(res.data);
        this.setState({
          sales: res.data,
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

  toggleDeleteModal = () => {
    this.setState({
      openDeleteModal: !this.state.openDeleteModal,
    });
    console.log("Customers:toggleDeleteModal");
  };

  setStateDeleteModal = (customer, a) => {
    this.setState({ customer: customer });
    // this.checkDelete(a);
    console.log(
      "Customers:setStateDeleteModal:Name: " +
        customer.name +
        " address: " +
        customer.address
    );
    this.toggleDeleteModal();
    // alert("If Customer is existing in Sales can't get Deleted..!");
  };

  // deleteCustomer = (id) => {
  //   alert("If Customer is existing in Sales Can't get Deleted...!!");
  //   axios
  //     .delete(`/Customers/DeleteCustomer/${id}`)
  //     .then((res) => {
  //       console.log(res);
  //       alert("Customer record Deleted..!");
  //       this.fetchData();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  toggleUpdateModal = (customer) => {
    this.setState({
      openUpdateModal: !this.state.openUpdateModal,
      customer: !this.state.openUpdateModal ? customer : {},
    });
  };

  pageChange = (e, pagData) => {
    this.setState({
      currentPage: pagData.activePage,
      totalPages: pagData.totalPages,
    });
    console.log(pagData);
    console.log(
      "Customers:pageChange:Saleid:  Product id:  Store id: Sale Time: "
    );
  };

  // checkDelete = (id) => {
  //  let newId= this.state.sales.filter(sales=> sales.customerId !== id)
  //  this.setState({sales:newId})
  // };

  render() {
    const customers = this.state.customers;
    const loaded = this.state.loaded;
    const openCreateModal = this.state.openCreateModal;
    const openUpdateModal = this.state.openUpdateModal;
    const openDeleteModal = this.state.openDeleteModal;
    const customer = this.state.customer;
    const sales = this.state.sales;
    const totalCustomersRec = this.state.totalCustomersRec;
    const currentPage = this.state.currentPage;

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

          <DeleteCustomerModal
            open={openDeleteModal}
            toggleDeleteModal={this.toggleDeleteModal}
            fetchData={this.fetchData}
            customer={customer}
            sales={sales}
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
              {customers.map((c, index) => {
                if (index >= currentPage * 3 - 3 && index < currentPage * 3) {
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
{/* 
                        {sales.filter((s) => {
                          if (customer.id === s.customerId) {
                            alert("Can not get Deleted...! ");
                          }
                        })} */}

                        <Button
                          id="delete"
                          icon
                          labelPosition="right"
                          color="red"
                          onClick={() => this.setStateDeleteModal(c)}
                        >
                          Delete
                          <Icon name="trash" />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  );
                }
              })}
            </Table.Body>
          </Table>
          <Pagination
            boundaryRange={0}
            activePage={currentPage}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            totalPages={Math.ceil(totalCustomersRec / 3)}
            onPageChange={(e, pagData) => this.pageChange(e, pagData)}
          />
        </div>
      );
    } else {
      return (
        <div>
          <Segment>
            <Dimmer active inverted>
              <Loader size="medium">Loading</Loader>
            </Dimmer>

            <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
          </Segment>
        </div>
      );
    }
  }
}
