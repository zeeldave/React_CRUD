import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Dropdown } from "semantic-ui-react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdateCustomerModal = (props) => {
  const { open, toggleModal, fetchData, sale, customers, products, stores   } = props;
  const [productId, setproduct] = useState();
  const [customerId, setcustomer] = useState();
  const [storeId, setstore] = useState();
  // const [date, setdate] = useState();
  const [loaded, setloaded] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    if (
      Object.keys(sale).length !== 0 &&
      sale.constructor === Object &&
      !loaded
    ) {
      setproduct(sale.productId);
      setcustomer(sale.customerId);
      setstore(sale.storeId);
      // setStartDate(sale.startDate);
      setloaded(true);
    }
    console.log()
  });

  
  const cancel = () => {
    setproduct();
    setcustomer();
    setstore();
    setStartDate();
    setloaded(false);
    toggleModal();
  };

  useEffect(() => {
    console.log(productId,customerId,storeId,startDate);
    return()=>{
     console.log(productId,customerId,storeId,startDate);
    }
   })

  const updateSales = (id) => {
    if (sale == undefined) {
      alert("Something Wrong.");
    } else {
      axios
        .put(`/Sales/PutSales/${id}`, {
          id: id,
          productId: productId,
          customerId: customerId,
          storeId: storeId,
          soldDate: startDate,
        })
        .then((res) => {
          console.log(res);
          fetchData();
          toggleModal();
          alert("Sales Updated..!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };


  if (sale) {
    return (
      <Modal open={open}>
        <Modal.Header>Update Sales Details</Modal.Header>
        <Modal.Content>
          <Form>

          <Form.Field>
            <label>Date of Sold</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </Form.Field>

            <Form.Field>
              <label>Customer</label>
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
              {/* <input
                placeholder="Please Select Customer"
                onChange={(e) => setcustomer(e.target.value)}
                value={sale.customer}
              /> */}
            </Form.Field>
            <Form.Field>
              <label>Product</label>
              <select placeholder="Select Product"
                className="ui dropdown"
                onChange={(e) => setproduct(e.target.value)}
              >
                {products.map((p) => {
                  return <option value={p.id}>{p.name}</option>;
                })}
              </select>
              {/* <input
                placeholder="Please Enter Product"
                onChange={(e) => setproduct(e.target.value)}
                value={sale.product}
              /> */}
            </Form.Field>
         
            <Form.Field>
              <label>Store</label>

              <select 
              placeholder="Select Store"
                className="ui dropdown"
                onChange={(e) => setstore(e.target.value)}
              >
                {stores.map((s) => {
                  return <option value={s.id}>{s.name}</option>;
                })}
              </select>
              {/* <input
                placeholder="Please Select Store"
                onChange={(e) => setstore(e.target.value)}
                value={sale.store}
              /> */}
            </Form.Field>
           
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={cancel}>
            Cancel
          </Button>
          <Button
            content="Submit"
            labelPosition="right"
            icon="checkmark"
            type="submit"
            onClick={() => updateSales(sale.id)}
            positive
          />
        </Modal.Actions>
      </Modal>
    );
  } else {
    return <div></div>;
  }
};

export default UpdateCustomerModal;
