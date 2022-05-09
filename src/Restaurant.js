import React, { useState } from "react";
import { tablesmock } from "./tables.mock";
import { items } from "./items.mock";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./App.css";
function Restaurant(props) {
  const [tables, settables] = useState(tablesmock);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);
  const [selectedTable, setselectedTable] = useState(null);
  const [selectedItem, setselectedItem] = useState();
  function toggleStatus(index) {
    var temp = [...tables];
    temp[index].status = temp[index].status === "FREE" ? "OCCUPIED" : "FREE";
    settables([...tables]);
  }
  // function getCostofItem(item) {
  //   return cost;
  // }
  function addOrder(tableId) {
    setselectedTable(tableId);
    handleShow();
  }

  function addToBilling() {
    setShow();
    console.log(selectedItem, selectedTable);
    var temp = [...tables];
    temp = temp.map((table) => {
      if (table.tableId === selectedTable) {
        table.items.push(selectedItem);
      }
      return table;
    });
    settables([...temp]);
    console.log(tables);
  }
  function genBill(index) {
    console.log(index);
    var orderedItems = tables[index].items;
    console.log(orderedItems);
    const result = orderedItems.reduce(function (r, a) {
      r[a.item] = r[a.item] || [];
      r[a.item].push(a);
      return r;
    }, Object.create(null));
    tables[index].bill = Object.entries(result);
    handleShow();
  }
  return (
    <div class="container d-flex  flex-wrap  justify-content-around">
      {tables.map((table, i) => {
        return (
          <div style={{ width: "260px" }}>
            <div
              class=""
              className={
                table.status === "FREE"
                  ? "card m-2 bg-success"
                  : "card m-2 bg-secondary"
              }
            >
              <div class="card-header d-flex justify-content-between">
                <h2>
                  <i class="bi bi-table"></i>
                  {table.tableId}
                </h2>
                <h2>
                  <i class="bi bi-people-fill"></i>
                  {table.seats}
                </h2>
              </div>
              <div class="card-body d-flex justify-content-between">
                <h5>{table.status === "FREE" ? "Free" : "Occupied"}</h5>
                <button
                  onClick={() => {
                    toggleStatus(i);
                  }}
                >
                  {table.status !== "FREE" ? "Free" : "Occupy"}
                </button>
              </div>
              <div class="card-footer" style={{ minHeight: "50px" }}>
                {table.status !== "FREE" && (
                  <div class=" d-flex justify-content-between">
                    <div>
                      <Button
                        variant="primary"
                        onClick={() => {
                          addOrder(table.tableId);
                        }}
                      >
                        <i class="bi bi-plus-circle-fill"></i>
                        Add Order
                      </Button>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          genBill(i);
                        }}
                      >
                        <i class="bi bi-receipt"></i>
                        Bill
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Selected Table: {selectedTable}
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => {
                      setselectedItem(items[e.target.value]);
                    }}
                  >
                    <option value={null} selected disabled>
                      Open this select menu
                    </option>
                    {items.map((item, i) => {
                      return <option value={i}>{item.item}</option>;
                    })}
                  </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={addToBilling}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Restaurant;
