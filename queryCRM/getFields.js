import axios from "axios";

export default async function getFields({ type, option }) {
  const data = await axios.get(`https://app.salesap.ru/api/v1/custom-fields?filter[resource-name]=${type}`, option)
}