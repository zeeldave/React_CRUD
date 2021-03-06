import React, { Component } from "react";
import axios from "axios";
import { Table, Button, Icon } from "semantic-ui-react";
import NewStoreModal from "./NewStoreModal";
import UpdateStoreModal from "./UpdateStoreModal";

export class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      loaded: false,
      openCreateModal: false,
      openUpdateModal: false,
      store: {},
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

  deleteStore = (id) => {
    axios
      .delete(`/Stores/DeleteStore/${id}`)
      .then((res) => {
        console.log(res);
        alert("Store record Deleted..!");
        this.fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggleUpdateModal = (store) => {
    this.setState({
      openUpdateModal: !this.state.openUpdateModal,
      store: !this.state.openUpdateModal ? store : {},
    });
  };

  render() {
    const stores = this.state.stores;
    const loaded = this.state.loaded;
    const openCreateModal = this.state.openCreateModal;
    const openUpdateModal = this.state.openUpdateModal;
    const store = this.state.store;

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
              {stores.map((s) => {
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
                      <Button icon labelPosition="right" color="red"
                        onClick={() => this.deleteStore(s.id)}>
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
