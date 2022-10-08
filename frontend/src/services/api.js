import axios from 'axios'

export default axios.create({
  baseURL: "https://recor-api.herokuapp.com/api"
});
