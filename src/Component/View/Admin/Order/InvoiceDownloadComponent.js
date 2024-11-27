import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts"; // Sử dụng vfs_fonts cho font mặc định
import React, { useEffect, useState } from "react";
import { customTranslate } from "../../../../i18n";
import axiosConfig from "../../../Config/AxiosConfig";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const InvoiceDownloadComponent = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderInfo, setOrderInfo] = useState({
    user: "",
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
          user: data.user,
          orderDate: data.orderDate,
          deliveryAddress: data.deliveryAddress,
        });
      })
      .catch((error) => {
        console.error("Error fetching order details", error);
      });
  }, [orderId]);

  const exportPDF = () => {
    // Tạo cấu trúc tài liệu PDF bằng Tiếng Anh
    const docDefinition = {
      content: [
        { text: "Hóa đơn chi tiết", style: "header" },
        {
          text: `Người mua: ${orderInfo.user}\nNgày đặt hàng: ${orderInfo.orderDate}\nĐịa chỉ nhận hàng: ${orderInfo.deliveryAddress}`,
          style: "info",
        },
        {
          style: "table",
          table: {
            body: [
              ["STT", "Tên sản phẩm", "Đơn giá", "Số lượng", "Thành tiền"],
              ...orderDetails.map((item, index) => [
                index + 1,
                item.foodName,
                `${item.price.toLocaleString("vi-VN")}đ`,
                item.quantity,
                `${(item.price * item.quantity).toLocaleString("vi-VN")}đ`,
              ]),
            ],
          },
        },
        {
          text: `Tổng tiền: ${orderDetails
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toLocaleString("vi-VN")}đ`,
          style: "total",
        },
      ],
      styles: {
        header: { fontSize: 18, alignment: "center" },
        info: { margin: [0, 20, 0, 20] },
        table: { margin: [0, 10, 0, 10] },
        total: { fontSize: 14, alignment: "right" },
      },
      defaultStyle: {
        font: "Roboto", // Sử dụng font Roboto hoặc một font mặc định
      },
    };

    // Tạo PDF
    pdfMake.createPdf(docDefinition).download(`order_${orderId}_details.pdf`);
  };

  return (
    <button onClick={exportPDF} className="btn btn-primary">
      {customTranslate("Export")} PDF
    </button>
  );
};

export default InvoiceDownloadComponent;
