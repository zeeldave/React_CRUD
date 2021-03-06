import React, { Component } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Icon,
  Dimmer,
  Loader,
  Image,
  Segment,
  Pagination,
} from "semantic-ui-react";
import NewSalesModal from "./NewSalesModal";
import UpdateSalesModal from "./UpdateSalesModal";
import DeleteSalesModal from "./DeleteSalesModal";

export class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: [],
      loaded: false,
      openCreateModal: false,
      openUpdateModal: false,
      openDeleteModal: false,
      sale: {},
      customers: [],
      customer: {},
      products: [],
      product: {},
      stores: [],
      store: {},
      totalSalesRec: 0,
      currentPage: 1,
      totalPages: 1,
    };
  }

  componentDidMount() {
    this.fetchData();
    this.fetchCustomerData();
    this.fetchProductData();
    this.fetchStoreData();
  }

  fetchData = () => {
    axios
      .get("/Sales/GetSales/")
      .then((res) => {
        console.log(res.data);
        this.setState({
          sales: res.data,
          loaded: true,
          totalSalesRec: res.data.length,
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

  fetchCustomerData = () => {
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

  fetchProductData = () => {
    axios
      .get("/Products/GetProduct/")
      .then((res) => {
        console.log(res.data);
        this.setState({
          products: res.data,
          loaded: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  fetchStoreData = () => {
    axios
      .get("/Stores/GetStore/")
      .then((res) => {
        console.log(res.data);
        this.setState({
          stores: res.data,
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
    console.log("Sales:toggleDeleteModal");
  };

  setStateDeleteModal = (sale) => {
    this.setState({ sale: sale });
    this.toggleDeleteModal();
  };

  // deleteSales = (id) => {
  //   axios
  //     .delete(`/Sales/DeleteSales/${id}`)
  //     .then((res) => {
  //       console.log(res);
  //       alert("Sales record Deleted..!");
  //       this.fetchData();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  toggleUpdateModal = (sale) => {
    this.setState({
      openUpdateModal: !this.state.openUpdateModal,
      sale: !this.state.openUpdateModal ? sale : {},
    });
  };

  pageChange = (e, pagData) => {
    this.setState({
      currentPage: pagData.activePage,
      totalPages: pagData.totalPages,
    });
    console.log(pagData);
  };

  render() {
    const sales = this.state.sales;
    const loaded = this.state.loaded;
    const openCreateModal = this.state.openCreateModal;
    const openUpdateModal = this.state.openUpdateModal;
    const openDeleteModal = this.state.openDeleteModal;
    const sale = this.state.sale;
    const products = this.state.products;
    const customers = this.state.customers;
    const stores = this.state.stores;
    const totalSalesRec = this.state.totalSalesRec;
    const currentPage = this.state.currentPage;

    if (loaded) {
      return (
        <div>
          <NewSalesModal
            open={openCreateModal}
            toggleModal={this.toggleModal}
            fetchData={this.fetchData}
            customers={customers}
            products={products}
            stores={stores}
          />

          <UpdateSalesModal
            open={openUpdateModal}
            toggleModal={this.toggleUpdateModal}
            fetchData={this.fetchData}
            sale={sale}
            customers={customers}
            products={products}
            stores={stores}
          />

          <DeleteSalesModal
            open={openDeleteModal}
            toggleDeleteModal={this.toggleDeleteModal}
            fetchData={this.fetchData}
            sale={sale}
            customers={customers}
            products={products}
            stores={stores}
          />

          <h1>Sales</h1>
          <Button color="blue" onClick={this.toggleModal}>
            Create New Sales
          </Button>
          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Customer</Table.HeaderCell>
                <Table.HeaderCell>Product</Table.HeaderCell>
                <Table.HeaderCell>Store</Table.HeaderCell>
                <Table.HeaderCell>Sold Date</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {sales.map((s, index) => {
                if (index >= currentPage * 3 - 3 && index < currentPage * 3) {
                  console.log("inside if: " + index);
                  return (
                    <Table.Row key={s.id}>
                      <Table.Cell>{s.customer.name}</Table.Cell>
                      <Table.Cell>{s.product.name}</Table.Cell>
                      <Table.Cell>{s.store.name}</Table.Cell>
                      <Table.Cell>{s.soldDateFor}</Table.Cell>

                      <Table.Cell>
                        <Button
                          icon
                          labelPosition="left"
                          color="yellow"
                          onClick={() => this.toggleUpdateModal(s)}
                        >
                          <Icon name="edit" />
                          Update
                        </Button>
                        <Button
                          icon
                          labelPosition="right"
                          color="red"
                          onClick={() => this.setStateDeleteModal(s)}
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
            totalPages={Math.ceil(totalSalesRec / 3)}
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
