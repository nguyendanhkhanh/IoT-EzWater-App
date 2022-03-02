import axios, { Axios } from 'axios';
import { store } from '../redux/store/store';
import { configEnv } from './@config';
import { configHttpRequest, configHttpResponse } from './@helper/network/interceptors';

export const getApiService = async () => {

  // get token from store
  // const { 
  //   auth: { token1 }
  // } = store.getState();

  // // TODO: auto get access_token when expired 
  // const token = store.getState().auth.access_token;

  const axiosConfig = axios.create({
    baseURL: baseUrl,
    headers: { 'Content-Type': 'application/json',  },
    withCredentials: true,
  });

  // config axios interceptor;
  configHttpRequest(axiosConfig);
  configHttpResponse(axiosConfig);

  return axiosConfig;
};

export const baseUrl = 'http://192.168.0.103:8000'