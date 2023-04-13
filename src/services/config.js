import axios from "axios";

export const http = axios.create({
    baseURL: 'https://www.cheapshark.com/api/1.0/deals?pageNumber=0&pageSize=22&storeID=1&onSale=1&AAA=1'
    // baseURL: 'https://www.cheapshark.com/api/1.0/deals'
})