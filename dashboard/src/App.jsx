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
            <div
              className={count === "Dashboard" ? "menu-active" : "menu"}
              onClick={() => setCount("Dashboard")}
            >
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
            <div
              className={count === "Order" ? "menu-active" : "menu"}
              onClick={() => setCount("Order")}
            >
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
            <div
              className={count === "Table" ? "menu-active" : "menu"}
              onClick={() => setCount("Table")}
            >
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
      <div className="dashboard">
        <div className="top-bar">
          <div className="right-menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              height="24px"
              width="24px"
              fill="#464555"
            >
              <path d="M4,19V17H6V10Q6,7.93 7.25,6.31T10.5,4.2V3.5q0-0.63 0.44-1.06T12,2t1.06,0.44T13.5,3.5V4.2q2,0.5 3.25,2.11T18,10v7h2v2H4Zm8-7.5ZM12,22q-0.82,0-1.41-0.59T10,20h4q0,0.82-0.59,1.41T12,22ZM8,17h8V10q0-1.65-1.17-2.82T12,6T9.18,7.18T8,10v7Z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              height="24px"
              width="24px"
              fill="#464555"
            >
              <path d="M12.84,17.64q0.36-0.36 0.36-0.89t-0.36-0.89T11.95,15.5t-0.89,0.36q-0.36,0.36-0.36,0.89t0.36,0.89T11.95,18t0.89-0.36Zm-1.79-3.49H12.9q0-0.82 0.19-1.3t1.06-1.3q0.65-0.65 1.03-1.24T15.55,8.9q0-1.4-1.03-2.15T12.1,6Q10.68,6 9.79,6.75T8.55,8.55L10.2,9.2q0.13-0.45 0.56-0.97T12.1,7.7q0.8,0 1.2,0.44T13.7,9.1q0,0.5-0.3,0.94t-0.75,0.81q-1.1,0.97-1.35,1.47t-0.25,1.82ZM12,22q-2.07,0-3.9-0.79q-1.82-0.79-3.17-2.14Q3.58,17.73 2.79,15.9T2,12Q2,9.92 2.79,8.1Q3.58,6.27 4.93,4.93Q6.28,3.57 8.1,2.79Q9.93,2 12,2t3.9,0.79t3.17,2.14q1.35,1.35 2.14,3.17Q22,9.92 22,12t-0.79,3.9t-2.14,3.17q-1.35,1.35-3.17,2.14T12,22Zm0-2q3.35,0 5.68-2.32T20,12T17.68,6.32T12,4T6.33,6.32T4,12t2.33,5.68T12,20Zm0-8Z" />
            </svg>
          </div>
        </div>
        <div className="content">
          <div className="stat-card">
            <div className="top">
              <div className="text">
                <span className="text1">Selamat Datang</span>
                <span className="text2">
                  Berikut ringkasan performa dan kesiapan operasional hari ini
                </span>
              </div>
              <div className="stat">
                <div className="card">
                  <div className="text1">
                    <span>Total Meja</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      height="28px"
                      width="28px"
                      fill="#3525CD"
                    >
                      <path d="M4.33,9H19.68L18.83,6H5.2L4.33,9ZM12,7.5ZM16.8,11H7.23L6.95,13h10.1L16.8,11ZM4,20l1.23-9H3q-0.5,0-0.79-0.4Q1.93,10.2 2.05,9.73l1.42-5Q3.58,4.4 3.83,4.2T4.43,4H19.58q0.35,0 0.6,0.2t0.35,0.52l1.43,5q0.13,0.47-0.16,0.88T21,11H18.8L20,20H18l-0.68-5H6.68L6,20H4Z" />
                    </svg>
                  </div>
                  <span className="text2">0</span>
                </div>
                <div className="card">
                  <div className="text1">
                    <span>Total Pekerja</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      height="28px"
                      width="28px"
                      fill="#3525CD"
                    >
                      <path d="M4,22q-0.82,0-1.41-0.59T2,20V9Q2,8.17 2.59,7.59T4,7H9V4Q9,3.17 9.59,2.59T11,2h2q0.83,0 1.41,0.59T15,4V7h5q0.83,0 1.41,0.59T22,9V20q0,0.82-0.59,1.41T20,22H4Zm0-2H20V9H15q0,0.82-0.59,1.41T13,11H11q-0.82,0-1.41-0.59T9,9H4V20Zm2-2h6V17.55q0-0.43-0.24-0.79T11.1,16.2q-0.5-0.22-1.01-0.34Q9.58,15.75 9,15.75q-0.57,0-1.09,0.11Q7.4,15.98 6.9,16.2q-0.42,0.2-0.66,0.56T6,17.55V18Zm8-1.5h4V15H14v1.5Zm-3.94-1.94q0.44-0.44 0.44-1.06t-0.44-1.06T9,12T7.94,12.44T7.5,13.5t0.44,1.06T9,15t1.06-0.44ZM14,13.5h4V12H14v1.5ZM11,9h2V4H11V9Zm1,5.5Z" />
                    </svg>
                  </div>
                  <span className="text2">0</span>
                </div>
                <div className="card">
                  <div className="text1">
                    <span>Jam Buka</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      height="28px"
                      width="28px"
                      fill="#464555"
                    >
                      <path d="M15.3,16.7l1.4-1.4L13,11.6V7H11v5.4l4.3,4.3ZM12,22q-2.07,0-3.9-0.79q-1.82-0.79-3.17-2.14Q3.58,17.73 2.79,15.9T2,12Q2,9.92 2.79,8.1Q3.58,6.27 4.93,4.93Q6.28,3.57 8.1,2.79Q9.93,2 12,2t3.9,0.79t3.17,2.14q1.35,1.35 2.14,3.17Q22,9.92 22,12t-0.79,3.9t-2.14,3.17q-1.35,1.35-3.17,2.14T12,22Zm0-10Zm0,8q3.33,0 5.66-2.34T20,12q0-3.33-2.34-5.66T12,4Q8.68,4 6.34,6.34T4,12t2.34,5.66T12,20Z" />
                    </svg>
                  </div>
                  <span className="text2">-:-</span>
                </div>
                <div className="card">
                  <div className="text1">
                    <span>Jam Tutup</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      height="28px"
                      width="28px"
                      fill="#464555"
                    >
                      <path d="M12,21q-3.75,0-6.38-2.63T3,12T5.63,5.63T12,3q0.35,0 0.69,0.02q0.34,0.02 0.66,0.07q-1.03,0.73-1.64,1.89T11.1,7.5q0,2.25 1.57,3.82T16.5,12.9q1.38,0 2.53-0.61t1.88-1.64q0.05,0.33 0.07,0.66T21,12q0,3.75-2.63,6.38T12,21Zm0-2q2.2,0 3.95-1.21t2.55-3.16q-0.5,0.13-1,0.2t-1,0.08q-3.07,0-5.24-2.16Q9.1,10.58 9.1,7.5q0-0.5 0.08-1t0.2-1Q7.43,6.3 6.21,8.05T5,12q0,2.9 2.05,4.95T12,19Zm-0.25-6.75Z" />
                    </svg>
                  </div>
                  <span className="text2">-:-</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function Order() {
  return (
    <>
      <h1>ORDER</h1>
    </>
  );
}
function Table() {
  return (
    <>
      <h1>TABLE</h1>
    </>
  );
}
