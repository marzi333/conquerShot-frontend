import { api } from "./api.services";
import { apiImg } from "./api.services";

// const getIssueById = (id) => api().get(`/issues/{id}`);
const getAllIssues = () => api().get(`/issues`);
const uploadIssuePic = (formData) => apiImg().post(`/image/upload`, formData);

export { getAllIssues, uploadIssuePic };
