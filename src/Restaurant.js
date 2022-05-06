import React, { useState } from "react";
import { tablesmock } from "./tables.mock";
import "./App.css";
import { tab } from "@testing-library/user-event/dist/tab";
function Restaurant(props) {
  const [tables, settables] = useState(tablesmock);
  function toggleStatus(index) {
    var temp = [...tables];
    temp[index].status = temp[index].status === "FREE" ? "OCCUPIED" : "FREE";
    settables([...tables]);
  }
  return (
    <div class="container d-flex  flex-wrap  justify-content-around">
      {tables.map((table, i) => {
        return (
          <div style={{ width: "250px", margin: "10px" }}>
            <div
              class=""
              className={
                table.status === "FREE"
                  ? "card m-3 bg-success"
                  : "card m-3 bg-info"
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
              <div class="card-body">
                <h2>{table.status === "FREE" ? "FREE" : "Occupied"}</h2>
              </div>
              <div class="card-footer">
                <button
                  onClick={() => {
                    toggleStatus(i);
                  }}
                >
                  change
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Restaurant;
