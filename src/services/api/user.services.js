import { api } from "./api.services";
import { apiImg } from "./api.services";

const getUserById = (id) => api().get(`/users`, id);

export { getUserById };
