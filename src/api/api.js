import axios from 'axios'; 
import moment from 'moment';

const baseUrlV1 = 'https://hn.algolia.com/api/v1/search_by_date';
const baseUrlV2 = 'https://hn.algolia.com/api/v1/search';


export const fetchNews = async(queryObject,cancelSignal)=>{
    const {query,type,by,time,page} = queryObject;
    let url;

    let _type = type;
    if(type==="All"){
        _type="(story,comment)";
    }

    if(time!=="AllTime"){
        url = baseUrlV1;
        if(query!==""){
            url+=`?query=${query}&tags=${_type}`;
        } else{
            url+=`?tags=${_type}`;
        } 
        let finalDate;
        if(time==="Last24h"){
            finalDate = moment().day(-24);
        } else if(time==="PastWeek"){
            finalDate = moment().day(-7);
        } else if(time==="PastMonth"){
            finalDate = moment().subtract(1,'month');
        } else{
            finalDate = moment().subtract(1,'year');  
        }
        url+=`&numericFilters=created_at_i>${finalDate.unix()}`;
    }  else{
        if(query===""){
            url=baseUrlV1+`?tags=${_type}`;
        } else{
            url=baseUrlV2+`?query=${query}&tags=${_type}`;
        } 

    }
    url+=`&page=${page}`;


    try{
        const {data} = await axios.get(url,{
            signal:cancelSignal,
        });
        return data;
    }
    catch(err){
        throw err;
    }
}