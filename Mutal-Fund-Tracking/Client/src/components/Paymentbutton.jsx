import React from "react";
import axios from "axios";

const Paymentbutton = ({ fundId, amount, refreshFunds }) => {
  const handlePayment = async () => {
    try {
      // 1. Create Razorpay order
      const { data } = await axios.post("http://localhost:5800/api/payments/create", {
        fundId,
        amount,
      });

      const options = {
        key:"rzp_test_RCj20utf1o0AVa" , // frontend key
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Mutual Fund Investment",
        order_id: data.order.id,
        handler: async function (response) {
          // 2. Verify payment on backend
          await axios.post("http://localhost:5800/api/payments/verify", {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            fundId,
          });
          alert("Payment Successful!");
          if (refreshFunds) refreshFunds();
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error(err);
      alert("Payment Failed");
    }
  };

  return <button className="btn btn-success" onClick={handlePayment}>Invest ₹{amount}</button>;
};

export default Paymentbutton;