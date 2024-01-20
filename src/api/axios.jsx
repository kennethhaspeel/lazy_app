import axios from 'axios';

export const axiosUrls = (url)=>{
    const overzicht = {
        base_url:'https://localhost:7023',
        login:'/Auth/login',
        loguit: 'Auth/loguit',
        registratie:'Auth/registreer',
        bevestigRegistratie: 'Auth/BevestigRegistratie',
        GetOverzichtTransacties: 'Financieel/GetOverzichtTransacties',
        NieuweTransactie: 'Financieel/NieuweTransactie',
        GetAllUsers: 'user/GetAllUsers',
        NieuweMissie: 'missie/NieuweMissie'
    }

  return overzicht[url]
}

export default axios.create({
    baseURL: axiosUrls('base_url')
});

export const axiosPrivate = axios.create({
    baseURL: axiosUrls('base_url'),
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

