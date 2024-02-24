import axios from "axios";
import { useEffect } from "react";

const PRODUCTS_URL = 'https://65d23e2a987977636bfc2271.mockapi.io/Productos'


const getProducts = () => {
    return axios.get(PRODUCTS_URL)
        .then((rpta) => {
          return rpta.data;
        })
        .catch((err) => {
            console.error(err)
        })
    
}

const saveProduct = (product) => {
    return axios.post(PRODUCTS_URL, product)
    .then((response) => {
        console.log(response.data)
        return response.data
    })
    .catch((error) => {
        console.error(error)
    })
}

const getProductById = (id) => {
    return axios.get(`${PRODUCTS_URL}/${id}`)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.log(error)
    })   
}

const updateProduct = (product) => {
    return axios.put(`${PRODUCTS_URL}/${product.id}`, product)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.log(error)
    })
}


const deleteProduct = (id) => {
    return axios.delete(`${PRODUCTS_URL}/${id}`)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.log(error)
    })
}

export {
    saveProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getProducts
}