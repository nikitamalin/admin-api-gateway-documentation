import axios from "axios";
// const url = "https://api-spec.vercel.app/api/domains/get-value"

const email = "nikita@cariqpay.com";
const domain = email.split("@").pop();
console.log(domain);
// const url = "http://localhost:3000/api/domains/get-value";
// const domainExists = await axios.get(url, {
//   params: { domain: domain }
// });
// console.log(domainExists.data.isAllowed);
