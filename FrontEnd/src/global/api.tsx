import axios from 'axios';
let baseURL = 'http://localhost:3333/v1/api/';
export const getRequest = async (extend: string) => {
  return await axios(baseURL + extend, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const postRequest = async (extend: string, data: Object) => {
  return await axios(baseURL + extend, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data,
  });
};
