const BASE_URL = 'https://outreach.cs.dal.ca:5002';

const getImageUrl = (imgurl) => {
  return `${BASE_URL}${imgurl}`;
};


module.exports = {
  BASE_URL,
  getImageUrl
};
