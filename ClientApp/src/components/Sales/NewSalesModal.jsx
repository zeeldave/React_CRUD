import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Dropdown } from "semantic-ui-react";
import axios from "axios";
import { Sales } from "./Sales";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewSalesModal = (props) => {
  const { open, toggleModal, fetchData, customers, products, stores } = props;
  const [productId, setproduct] = useState(null);
  const [customerId, setcustomer] = useState(null);
  const [storeId, setstore] = useState(null);
  // const [date, setdate] = useState();
  const [startDate, setStartDate] = useState(new Date());

  const createSales = () => {
    if (!productId || !customerId || !storeId || !startDate) {
      alert("Please enter all Details!");
    } else {
      axios
        .post("/Sales/PostSales", {
          productId: productId,
          customerId: customerId,
          storeId: storeId,
          soldDate: startDate,
        })
        .then((res) => {
          console.log(res);
          fetchData();
          toggleModal();
          alert("New Sales Created...");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

const resetNewSalesData=()=>{
  setproduct(null)
  setcustomer(null)
  setstore(null)
}

const resetNewSalesDataOnCancel=()=>{
  resetNewSalesData();
  toggleModal();
}

useEffect(() => {
 console.log(productId,customerId,storeId,startDate);
 return()=>{
  console.log(productId,customerId,storeId,startDate);
 }
})


  if (customers && products && stores) {
    console.log(Sales);
    return (
      <Modal open={open}>
        <Modal.Header>Create New Sales</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field required>
              <label>Date of Sold</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />

              {/* <input
                placeholder="Please Enter Date"
                onChange={(e) => setdate(e.target.value)}
              /> */}
            </Form.Field>



            <Form.Field required>
              <label>Customer</label>

              {/* <Dropdown
                placeholder="Select Customer"
                fluid
                selection
                
                options={customers.map((c) => {
                  return {
                    text: c.name,
                    value: c.id,
                  };
                })}
                onChange={(e) => setcustomer(e.target.value)}
              /> */}

              <select
              placeholder="Select Customer"
              fluid
              selection
                className="ui dropdown"
                onChange={(e) => setcustomer(e.target.value)}
              >
                {customers.map((c) => {
                  return <option value={c.id}>{c.name}</option>;
                })}
              </select>
            </Form.Field>

            <Form.Field required>
              <label>Product</label>

              {/* <Dropdown
                placeholder="Select Product"
                fluid
                selection
               
                options={products.map((p) => {
                  return {
                    key: p.id,
                    text: p.name,
                    value: p.id,
                  };
                })}
                onChange={(e) => setproduct(e.target.value)}
              /> */}

              <select placeholder="Select Product"
                className="ui dropdown"
                onChange={(e) => setproduct(e.target.value)}
              >
                {products.map((p) => {
                  return <option value={p.id}>{p.name}</option>;
                })}
              </select>
            </Form.Field>
          
            <Form.Field required>
              <label>Store</label>

              {/* <Dropdown
                placeholder="Select Store"
                fluid
                selection
               
                options={stores.map((s) => {
                  return {
                    key: s.id,
                    text: s.name,
                    value: s.id,
                  };
                })}
                onChange={(e) => setstore(e.target.value)}
              /> */}

              <select 
              placeholder="Select Store"
                className="ui dropdown"
                onChange={(e) => setstore(e.target.value)}
              >
                {stores.map((s) => {
                  return <option value={s.id}>{s.name}</option>;
                })}
              </select>
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={resetNewSalesDataOnCancel}>
            Cancel
          </Button>
          <Button
            content="Submit"
            labelPosition="right"
            icon="checkmark"
            onClick={() => createSales()}
            positive
          />
        </Modal.Actions>
      </Modal>
    );
  }
};

export default NewSalesModal;
