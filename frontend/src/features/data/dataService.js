import axios from 'axios';

const API_URL = '/api/data/';

// Create new data
const createData = async (dataData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, dataData, config);
  return response.data;
};

// Get user data
const getData = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete user data
const deleteData = async (dataId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + dataId, config);

  return response.data;
};

const dataService = {
  createData,
  getData,
  deleteData,
};

export default dataService;
