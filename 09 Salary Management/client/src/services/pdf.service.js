import axios from "axios";

const API_URL = "http://localhost:5000/api/pdf/";

const getPdf = () => {
  return axios.get(API_URL);
};

const PDFService = {
  getPdf
};

export default PDFService;
