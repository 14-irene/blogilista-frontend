import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async newObject => {
  const conf = { headers: { Authorization: token }, }
  const res = await axios.post(baseUrl, newObject, conf)
  return res.data
}

const update = async (newObject) => {
  const res = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
  return res.data
}

const remove = async targetObject => {
  const conf = { headers: { Authorization: token }, }
  const res = await axios.delete(`${baseUrl}/${targetObject.id}`, conf)
  return res.data
}

export default { setToken, getAll, create, update, remove }
