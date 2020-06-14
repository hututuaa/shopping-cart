import axios  from 'axios'

// const BASE_URL = "http://localhost:3000/"
const BASE_URL = "./"
// export default function getData(url){
//   return new Promise((resolve,reject)=>{
//   axios.get(url).then((res=>{
//       resolve(res)
//   })).catch((res)=>{
//       reject(res)
//   })
//   })
// }
export const  getProductsData =() => axios.get(BASE_URL+'produceData.json')

  
  
  