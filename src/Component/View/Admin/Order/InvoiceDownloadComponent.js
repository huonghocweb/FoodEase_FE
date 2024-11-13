import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts"; // Sử dụng vfs_fonts cho font mặc định
import React, { useEffect, useState } from "react";
import axiosConfig from "../../../Config/AxiosConfig";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const InvoiceDownloadComponent = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderInfo, setOrderInfo] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    orderDate: "",
    deliveryAddress: "",
  });

  useEffect(() => {
    axiosConfig
      .get(`/order/${orderId}/details`)
      .then((response) => {
        const data = response.data;
        setOrderDetails(data.orderDetails);
        setOrderInfo({
          fullName: data.user.fullName,
          email: data.user.email,
          phoneNumber: data.user.phoneNumber,
          orderDate: data.orderDate,
          deliveryAddress: data.deliveryAddress,
        });
      })
      .catch((error) => {
        console.error("Error fetching order details", error);
      });
  }, [orderId]);

  const exportPDF = () => {
    const docDefinition = {
      content: [
        { text: "Hóa đơn chi tiết", style: "header" },
        {
          text: `Người mua: ${orderInfo.fullName}\nEmail: ${orderInfo.email}\nSố điện thoại: ${orderInfo.phoneNumber}\nNgày đặt hàng: ${orderInfo.orderDate}\nĐịa chỉ nhận hàng: ${orderInfo.deliveryAddress}`,
          style: "info",
        },
        {
          style: "table",
          table: {
            widths: ["auto", "*", "auto", "auto", "auto"], // Để bảng rộng ra hơn
            body: [
              [
                { text: "STT", bold: true },
                { text: "Tên sản phẩm", bold: true },
                { text: "Đơn giá", bold: true },
                { text: "Số lượng", bold: true },
                { text: "Thành tiền", bold: true },
              ],
              ...orderDetails.map((item, index) => [
                { text: index + 1, alignment: "center" },
                // { text: item.foodName },
                {
                  text: [
                    { text: `${item.foodName}\n`, bold: true }, // Tên món in đậm
                    { text: `${item.size}\n`, fontSize: 10, italics: true }, // Size nhỏ hơn và in nghiêng
                    { text: `Topping: ${item.topping.join(", ")}`, fontSize: 10, italics: true }, // Topping nhỏ hơn và in nghiêng
                  ],
                },
                { text: `${item.price.toLocaleString("vi-VN")}đ`, alignment: "right" },
                { text: item.quantity, alignment: "center" },
                {
                  text: `${(item.price * item.quantity).toLocaleString("vi-VN")}đ`,
                  alignment: "right",
                },
              ]),
            ],
          },
        },
        { text: "\n" },
        {
          text: `Tổng tiền: ${orderDetails
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toLocaleString("vi-VN")}đ`,
          style: "total",
        },
      ],
      styles: {
        header: { fontSize: 18, alignment: "center", bold: true, margin: [0, 0, 0, 10] },
        info: { margin: [0, 0, 0, 20], fontSize: 12 },
        table: { margin: [0, 10, 0, 10] },
        total: { fontSize: 14, alignment: "right", bold: true, margin: [0, 10, 0, 0] },
      },
      defaultStyle: {
        font: "Roboto",
      },
    };

    pdfMake.createPdf(docDefinition).download(`order_${orderId}_details.pdf`);
  };

  return (
    <button onClick={exportPDF} className="btn btn-primary">
      Export PDF
    </button>
  );
};

export default InvoiceDownloadComponent;
