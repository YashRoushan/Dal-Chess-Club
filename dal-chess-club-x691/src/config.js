const BASE_URL = 'https://outreach.cs.dal.ca/chessclub:5001';

const getImageUrl = (imgurl) => {
  return `${BASE_URL}${imgurl}`;
};


module.exports = {
  BASE_URL,
  getImageUrl
};
