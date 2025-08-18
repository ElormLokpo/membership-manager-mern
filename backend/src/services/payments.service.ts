import axios from "axios";

export const initializePaymentService = async () => {
  return await axios
    .post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: "benedictdev31@gmail.com",
        amount: "20000",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SK_KEY}`,
        },
      }
    )
    .then((res) => res.data.data)
    .catch((error) => console.log("ERRORRRRR", error));
};
