import axios from 'axios'

const baseUrl = '/api/persons'

export const create = (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => response.data)
}

export const get = (id) => {
  return axios.get(`${baseUrl}/${id}`).then((response) => response.data)
}

export const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data)
}

export const update = (id, modified) => {
  return axios
    .put(`${baseUrl}/${id}`, modified)
    .then((response) => response.data)
}

export const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}
