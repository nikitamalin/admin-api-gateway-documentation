import axios from "axios";
const domainExists = await axios.get(
  "https://api-spec.vercel.app//api/domains/get-value",
  {
    data: { domain: "yo" }
  }
);

const res = await domainExists.json();

console.log(res);
