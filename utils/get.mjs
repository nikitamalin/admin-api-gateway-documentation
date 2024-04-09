import axios from "axios";
// const url = "https://api-spec.vercel.app/api/domains/get-value"
const url = "http://localhost:3000/api/domains/get-value";
const domainExists = await axios.get(url, {
  params: { domain: "cariqpay.com" }
});
console.log(domainExists.data.isAllowed);

// const res = await domainExists.json();
// console.log(res);
