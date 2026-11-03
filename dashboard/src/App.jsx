import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState("Dashboard");

  return (
    <app className="app">
      <div className="navbar">
        <div className="space">
          <div className="card">MENU UTAMA</div>
          <div className="menus">
            <div className={count === "Dashboard" ? "menu-active":"menu"} onClick={() => setCount("Dashboard")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                height="24px"
                width="24px"
                fill="#464555"
              >
                <path d="M3,11V3h8v8H3ZM3,21V13h8v8H3ZM13,11V3h8v8H13Zm0,10V13h8v8H13ZM5,9H9V5H5V9ZM15,9h4V5H15V9Zm0,10h4V15H15v4ZM5,19H9V15H5v4ZM15,9Zm0,6ZM9,15ZM9,9Z" />
              </svg>
              <span>Dashboard</span>
            </div>
            <div className={count === "Order" ? "menu-active":"menu"} onClick={() => setCount("Order")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                height="24px"
                width="24px"
                fill="#464555"
              >
                <path d="M6,22q-1.25,0-2.13-0.88T3,19V16H6V2L7.5,3.5L9,2l1.5,1.5L12,2l1.5,1.5L15,2l1.5,1.5L18,2l1.5,1.5L21,2V19q0,1.25-0.88,2.13T18,22H6Zm12-2q0.43,0 0.71-0.29Q19,19.43 19,19V5H8V16h9v3q0,0.43 0.29,0.71T18,20ZM9,9V7h6V9H9Zm0,3V10h6v2H9Zm8-3q-0.43,0-0.71-0.29T16,8q0-0.43 0.29-0.71T17,7t0.71,0.29T18,8q0,0.42-0.29,0.71T17,9Zm0,3q-0.43,0-0.71-0.29Q16,11.43 16,11t0.29-0.71T17,10t0.71,0.29T18,11t-0.29,0.71T17,12ZM6,20h9V18H5v1q0,0.43 0.29,0.71T6,20ZM5,20q0,0 0-0.29Q5,19.43 5,19V18v2Z" />
              </svg>
              <span>Pesanan</span>
            </div>
            <div className={count === "Table" ? "menu-active":"menu"} onClick={() => setCount("Table")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                height="24px"
                width="24px"
                fill="#464555"
              >
                <path d="M4.33,9H19.68L18.83,6H5.2L4.33,9ZM12,7.5ZM16.8,11H7.23L6.95,13h10.1L16.8,11ZM4,20l1.23-9H3q-0.5,0-0.79-0.4Q1.93,10.2 2.05,9.73l1.42-5Q3.58,4.4 3.83,4.2T4.43,4H19.58q0.35,0 0.6,0.2t0.35,0.52l1.43,5q0.13,0.47-0.16,0.88T21,11H18.8L20,20H18l-0.68-5H6.68L6,20H4Z" />
              </svg>
              <span>Meja</span>
            </div>
          </div>
        </div>
      </div>
      {count === "Dashboard" && <Dahsboard />}
      {count === "Order" && <Order />}
      {count === "Table" && <Table />}
    </app>
  );
}

export default App;

function Dahsboard() {
  return (
    <>
    <h1>Dashboard</h1>
    </>
  )
}
function Order() {
  return (
    <>
    <h1>ORDER</h1>
    </>
  )
}
function Table() {
  return (
    <>
    <h1>TABLE</h1>
    </>
  )
}