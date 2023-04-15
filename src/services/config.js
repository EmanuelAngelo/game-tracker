import axios from "axios";

export const http = axios.create({
    baseURL: 'https://www.cheapshark.com/api/1.0/deals?title=&pageNumber=0&pageSize=9&storeID=1&onSale=1&AAA=1'
    // baseURL: 'https://www.cheapshark.com/api/1.0/games?title=batman&steamAppID=35140&limit=60&exact=0'
    // baseURL: 'https://www.cheapshark.com/api/1.0/deals'
})