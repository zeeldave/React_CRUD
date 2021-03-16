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
import NewProductModal from "./NewProductModal";
import UpdateProductModal from "./UpdateProductModal";
import DeleteProductModal from "./DeleteProductModal";

export class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loaded: false,
      openCreateModal: false,
      openUpdateModal: false,
      openDeleteModal: false,
      product: {},
      totalProductsRec: 0,
      currentPage: 1,
      totalPages: 1,
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
          totalProductsRec: res.data.length,
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

  toggleModal = () => {
    this.setState({
      openCreateModal: !this.state.openCreateModal,
    });
  };

  toggleDeleteModal = () => {
    this.setState({
      openDeleteModal: !this.state.openDeleteModal,
    });
    console.log("Products:toggleDeleteModal");
  };

  setStateDeleteModal = (product) => {
    this.setState({ product: product });
    console.log(
      "Products:setStateDeleteModal:Name: " +
        product.name +
        " price: " +
        product.price
    );
    this.toggleDeleteModal();
    // alert("If Product is existing in Sales can't get Deleted..!");
  };

  // deleteProduct = (id) => {
  //   alert("If Product is existing in Sales Can't get Deleted...!!");
  //   axios
  //     .delete(`/Products/DeleteProduct/${id}`)
  //     .then((res) => {
  //       console.log(res);
  //       alert("Product record Deleted..!");
  //       this.fetchData();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  toggleUpdateModal = (product) => {
    this.setState({
      openUpdateModal: !this.state.openUpdateModal,
      product: !this.state.openUpdateModal ? product : {},
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
    const products = this.state.products;
    const loaded = this.state.loaded;
    const openCreateModal = this.state.openCreateModal;
    const openUpdateModal = this.state.openUpdateModal;
    const openDeleteModal = this.state.openDeleteModal;
    const product = this.state.product;
    const totalProductsRec = this.state.totalProductsRec;
    const currentPage = this.state.currentPage;

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

          <DeleteProductModal
            open={openDeleteModal}
            toggleDeleteModal={this.toggleDeleteModal}
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
              {products.map((p, index) => {
                if (index >= currentPage * 3 - 3 && index < currentPage * 3) {
                  console.log("inside if: " + index);
                  return (
                    <Table.Row key={p.id}>
                      <Table.Cell>{p.name}</Table.Cell>
                      <Table.Cell>
                        {"$"}
                        {p.price}
                      </Table.Cell>
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
                          onClick={() => this.setStateDeleteModal(p)}
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
            totalPages={Math.ceil(totalProductsRec / 3)}
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
