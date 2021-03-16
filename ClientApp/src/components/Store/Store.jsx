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
import NewStoreModal from "./NewStoreModal";
import UpdateStoreModal from "./UpdateStoreModal";
import DeleteStoreModal from "./DeleteStoreModal";

export class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      loaded: false,
      openCreateModal: false,
      openUpdateModal: false,
      openDeleteModal: false,
      store: {},
      totalStoresRec: 0,
      currentPage: 1,
      totalPages: 1,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get("/Stores/GetStore/")
      .then((res) => {
        console.log(res.data);
        this.setState({
          stores: res.data,
          loaded: true,
          totalStoresRec: res.data.length,
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
    console.log("Stores:toggleDeleteModal");
  };

  setStateDeleteModal = (store) => {
    this.setState({ store: store });
    console.log(
      "stores:setStateDeleteModal:Name: " +
        store.name +
        " address: " +
        store.address
    );
    this.toggleDeleteModal();
    // alert("If Store is existing in Sales can't get Deleted..!");
  };

  // deleteStore = (id) => {
  //   alert("If Store is existing in Sales Can't get Deleted...!!");
  //   axios
  //     .delete(`/Stores/DeleteStore/${id}`)
  //     .then((res) => {
  //       console.log(res);
  //       alert("Store record Deleted..!");
  //       this.fetchData();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  toggleUpdateModal = (store) => {
    this.setState({
      openUpdateModal: !this.state.openUpdateModal,
      store: !this.state.openUpdateModal ? store : {},
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
    const stores = this.state.stores;
    const loaded = this.state.loaded;
    const openCreateModal = this.state.openCreateModal;
    const openUpdateModal = this.state.openUpdateModal;
    const openDeleteModal = this.state.openDeleteModal;
    const store = this.state.store;
    const totalStoresRec = this.state.totalStoresRec;
    const currentPage = this.state.currentPage;

    if (loaded) {
      return (
        <div>
          <NewStoreModal
            open={openCreateModal}
            toggleModal={this.toggleModal}
            fetchData={this.fetchData}
          />

          <UpdateStoreModal
            open={openUpdateModal}
            toggleModal={this.toggleUpdateModal}
            fetchData={this.fetchData}
            store={store}
          />

          <DeleteStoreModal
            open={openDeleteModal}
            toggleDeleteModal={this.toggleDeleteModal}
            fetchData={this.fetchData}
            store={store}
          />

          <h1>Stores</h1>
          <Button color="blue" onClick={this.toggleModal}>
            Create New Store
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
              {stores.map((s, index) => {
                if (index >= currentPage * 3 - 3 && index < currentPage * 3) {
                  console.log("inside if: " + index);
                  return (
                    <Table.Row key={s.id}>
                      <Table.Cell>{s.name}</Table.Cell>
                      <Table.Cell>{s.address}</Table.Cell>
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
            totalPages={Math.ceil(totalStoresRec / 3)}
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
