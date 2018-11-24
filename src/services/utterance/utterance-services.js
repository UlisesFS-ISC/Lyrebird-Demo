import axios from "axios";


export const getData = async token => {
  const response = await axios({
    method: "get",
    url: `${process.env.API_BASE}/api/v0/generated`,
    headers: { Authorization: "Bearer " + token }
  });
  return response.data.results;
};

export const insertUtterance = async (entry, token) => {
  await axios({
    method: "post",
    url: `${process.env.API_BASE}/api/v0/generate`,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    },
    data: {
      text: entry
    }
  });
};
