import InstanciaAxios from "./config";
// &storeID=1&onSale=1&AAA=1
export default {
    listar:(sortBy, sortOrdem, textFilter, qtdProdutosNaLista) => {
        const objQueryParams = {
            sortBy,
            desc: sortOrdem,
            title: textFilter,
            pageSize: qtdProdutosNaLista,
            storeID: 1,
            onSale: 1,
            AAA: 1,
        }
        console.log(sortBy, textFilter, qtdProdutosNaLista);
        const stringQueryParams = ObjToQueryParam(objQueryParams)
        return InstanciaAxios.get(`/deals${stringQueryParams}`)
    }
}

function ObjToQueryParam(obj) {
    if (obj === null || obj === undefined) return "";
  
    let queryParam = [];
  
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "")
        queryParam.push(
          encodeURIComponent(key) + "=" + encodeURIComponent(obj[key])
        );
    });
  
    if (queryParam.length > 0) return "?" + queryParam.join("&");
    else return "";
  }