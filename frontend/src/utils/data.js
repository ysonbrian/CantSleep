import { Axios } from './auth';

const API_URL = 'http://localhost:1234';

export const getAllUsersWList = () => {
  const data = Axios.get(`${API_URL}`);
  try {
    if (data) {
      return data;
    }
  } catch (error) {
    console.log('No data!');
  }
};

export const writingContent = async (data) => {
  return await Axios.post(`${API_URL}/create`, {
    data,
  });
};

export const submitNFT = async (data) => {
  return await Axios.post(`${API_URL}/nft`, {
    data,
  });
};

export const getNftList = () => {
  const data = Axios.get(`${API_URL}/nft/explore`);
  try {
    if (data) return data;
  } catch (error) {
    console.log('No NFT data!');
  }
};

export const getMyNftList = async (user) => {
  console.log('hahahahah', user);
  const data = await Axios.post(`${API_URL}/nft/mypage`, { data: user });
  try {
    if (data) return data;
  } catch (error) {
    console.log('No NFT data!');
  }
};
