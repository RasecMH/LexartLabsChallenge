import axios from 'axios';

export default async function fetcher(url: string, parameter: string) {
  return axios.get(`${url}${parameter}`, {
    headers: { 'Content-Type': 'application/json' },
  });
}
