import { api } from "./api.services";
import { apiImg } from "./api.services";

const getUserById = (id) => api().get(`/users?user_id=${id.toString()}`);
const getLeaderBoard = () => api().get(`/leaderboard`);

export { getUserById, getLeaderBoard };
