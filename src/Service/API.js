import axios from "axios";

const APIKEY='27705684-ea6ff4282bc06d8fe5ddb5326'
axios.defaults.baseURL = `https://pixabay.com/api/`;
  axios.defaults.params = {
  orientation: 'horizontal',
  per_page: 12,
};
export const options= axios.defaults.params;
export const fetchPictures=async(page,picture)=>{
    const {data}= await axios(`?q=${picture}&page=${page}&key=${APIKEY}&image_type=photo`);
 return data
}