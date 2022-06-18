import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = async () => {
    const request = axios.get(baseUrl);
    const response = await request;
    return response.data;
};

const create = async (newObject) => {
    const request = axios.post(baseUrl, newObject);
    const response = await request;
    return response.data;
};

const deleteOne = async (id) => {
    axios.delete(`${baseUrl}/${id}`);
};

const updateOne = async (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    const response = await request;
    return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, deleteOne, updateOne };
