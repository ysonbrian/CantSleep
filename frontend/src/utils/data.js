import axios from 'axios';

const API_URL = 'http://localhost:1234';

export const getAllUsersWList = () => {
  const data = axios.get(`${API_URL}`);
  try {
    if (data) {
      return data;
    }
  } catch (error) {
    console.log('No data!');
  }
};

export const writingContent = async (data) => {
  return await axios.post(`${API_URL}/create`, {
    data,
  });
};
