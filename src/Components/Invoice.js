import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../styles/Invoice.css";
// import { ImDownload2 } from "react-icons/im";
import { RiDownload2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Invoice = () => {
  const invoiceData = {
    invoiceNumber: "INV-001",
    date: "14-feb-2022",
    time: "9.30am",
    customer: {
      pickupaddress: "",
      name: "Suriya.G",
      email: "mailto:johndoe@example.com",
      address: "766,kennet lane, \nEgmore,chennai-600008.",
      contact: "9360302955",
    },
    customer1: {
      droppaddress: "",
      name: "M.Mujjamil",
      email: "mailto:johndoe@example.com",
      address: "702,Rito street, \nMaraimalainagar,chengalpattu,-6000025.",
      contact: "9360302955",
    },
    items: [
      {
        description: "House Shifting",
        quantity: 2,
        price: "750",
        dateTime: "14-feb-2022 : 08:30 am",
        manpower: "2 persons",
        vehicle: "Tata Ace",
      },
    ],
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableData = [];

    // Format invoice data into table rows
    invoiceData.items.forEach((item, index) => {
      const rowData = [
        item.description,
        item.dateTime,
        item.manpower,
        item.vehicle,
        item.price,
        // `$${item.price.toFixed(2)}`,
        // `$${item.price.toFixed(2)}`,
      ];
      tableData.push(rowData);
    });

    // Add content to the PDF document
    doc.setFontSize(16);
    doc.text(`Invoice #${invoiceData.invoiceNumber}`, 14, 15);
    doc.setFontSize(12);
    doc.text(`Pickup Address: ${invoiceData.customer.pickupaddress}`, 14, 35);
    doc.text(`Name: ${invoiceData.customer.name}`, 14, 45);
    doc.text(`Address: ${invoiceData.customer.address}`, 14, 55);
    doc.text(`Contact: ${invoiceData.customer.contact}`, 14, 70);

    doc.text(`Drop Address: ${invoiceData.customer.pickupaddress}`, 110, 35);
    doc.text(`Name: ${invoiceData.customer1.name}`, 110, 45);
    doc.text(`Address: ${invoiceData.customer1.address}`, 110, 55);
    doc.text(`Contact: ${invoiceData.customer1.contact}`, 110, 70);

    doc.autoTable({
      startY: 80,
      head: [["Category", "Date & Time", "Manpower", "Vehicle", "Payment"]],
      body: tableData,
      foot: [["", "", "", "Total", `${getSubtotal().toFixed(2)}`]],
    });

    // Calculate and add tax and total
    const taxRate = 0.1;
    const tax = getSubtotal() * taxRate;
    const total = getSubtotal() + tax;

    doc.setFontSize(12);
    doc.text(
      `Tax (${(taxRate * 100).toFixed(0)}%): $${tax.toFixed(2)}`,
      14,
      doc.autoTable.previous.finalY + 10
    );
    doc.text(
      `Total: $${total.toFixed(2)}`,
      14,
      doc.autoTable.previous.finalY + 20
    );

    // Save the PDF file
    doc.save("invoice.pdf");
  };

  const getSubtotal = () => {
    return invoiceData.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
  };

  return (
    <section className="invoice">
      <div className="container">
        <div className="row ">
          <h1>Invoice id #{invoiceData.invoiceNumber}</h1>
          <div className="col-lg-6 col-md-6 col-12 my-2">
            <span>
              <div className="pick">
                <div>
                  <strong>Pickup Address :{invoiceData.pickupaddress}</strong>
                </div>
                <div>
                  <strong>Name :</strong> {invoiceData.customer.name}
                </div>
                <div>
                  <strong>Address :</strong> {invoiceData.customer.address}
                </div>
                <div>
                  <strong>Contact :</strong> {invoiceData.customer.contact}
                </div>
              </div>
            </span>
          </div>
          <div className="col-lg-6 col-md-6 col-12 my-2">
            <span>
              <div className="drop">
                <div>
                  <strong>Drop Address :</strong>
                </div>
                <div>
                  <strong>Name :</strong> {invoiceData.customer1.name}
                </div>
                <div>
                  <strong>Address :</strong> {invoiceData.customer1.address}
                </div>
                <div>
                  <strong>Contact :</strong> {invoiceData.customer1.contact}
                </div>
              </div>
            </span>
          </div>
        </div>
        <div className="row">
          <div className="table-responsive">
            <table class="table table-striped table-bordered">
              <thead class="table-primary">
                <tr>
                  <th>Category</th>
                  <th>Date&Time</th>
                  <th>Manpower</th>
                  <th>Vehicle</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.description}</td>
                    <td>{item.dateTime}</td>
                    <td>{item.manpower}</td>
                    <td>{item.vehicle}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot class="table-striped table-bordered table-light">
                <tr>
                  <td colspan="4">Total</td>
                  <td>{getSubtotal().toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <button
            onClick={generatePDF}
            className="btn btn-primary"
            style={{ width: "40px" }}
          >
            <RiDownload2Fill />
          </button>
          <div className="d-flex align-item-center justify-content-end">
            <Link to="/">
              <span id="BackToHome">back to home &#8702;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Invoice;
