import React, { Component } from "react";
import axios from "axios";
import { Table, Button, Icon } from "semantic-ui-react";
import NewProductModal from "./NewProductModal";
import UpdateProductModal from "./UpdateProductModal";

export class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loaded: false,
      openCreateModal: false,
      openUpdateModal: false,
      product: {},
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
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

  toggleModal = () => {
    this.setState({
      openCreateModal: !this.state.openCreateModal,
    });
  };

  deleteProduct = (id) => {
    axios
      .delete(`/Products/DeleteProduct/${id}`)
      .then((res) => {
        console.log(res);
        alert("Product record Deleted..!");
        this.fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggleUpdateModal = (product) => {
    this.setState({
      openUpdateModal: !this.state.openUpdateModal,
      product: !this.state.openUpdateModal ? product : {},
    });
  };

  render() {
    const products = this.state.products;
    const loaded = this.state.loaded;
    const openCreateModal = this.state.openCreateModal;
    const openUpdateModal = this.state.openUpdateModal;
    const product = this.state.product;

    if (loaded) {
      return (
        <div>
          <NewProductModal
            open={openCreateModal}
            toggleModal={this.toggleModal}
            fetchData={this.fetchData}
          />

          <UpdateProductModal
            open={openUpdateModal}
            toggleModal={this.toggleUpdateModal}
            fetchData={this.fetchData}
            product={product}
          />

          <h1>Products</h1>
          <Button color="blue" onClick={this.toggleModal}>
            Create New Product
          </Button>
          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {products.map((p) => {
                return (
                  <Table.Row key={p.id}>
                    <Table.Cell>{p.name}</Table.Cell>
                    <Table.Cell>{"$"}{p.price}</Table.Cell>
                    <Table.Cell>
                      <Button
                        icon
                        labelPosition="left"
                        color="yellow"
                        onClick={() => this.toggleUpdateModal(p)}
                      >
                        <Icon name="edit" />
                        Update
                      </Button>
                      <Button
                        icon
                        labelPosition="right"
                        color="red"
                        onClick={() => this.deleteProduct(p.id)}
                      >
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
