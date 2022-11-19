import { api } from "./api.services";
import { apiImg } from "./api.services";

const getAllTiles = () => api().get(`/tiles`);

export { getAllTiles };
