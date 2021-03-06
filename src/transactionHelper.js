import config from './config'
import TokenService from './services/token-service';

export const deleteTransaction = (transactionId, callback) => {

  fetch(`${config.API_ENDPOINT}/:accountId/transactions/${transactionId}`, {
    method: 'DELETE',
    headers: {
      'authorization': `basic ${TokenService.getAuthToken()}`,
    }
  })
    .then(res => {
      if (!res.ok) {
        res.json().then(error => Promise.reject(error))
      }
    })
    .then(() => {
      callback(transactionId)
    })
    .catch(error => {
      console.log(error)
    })
}

export const addTransaction = (callback, category, date, cost, payee = '', memo = '') => {
  fetch(`${config.API_ENDPOINT}/:accountId`, {
    method: 'POST',
    headers: {
      'authorization': `basic ${TokenService.getAuthToken()}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ category: category, date: date, cost: cost, payee: payee, memo: memo })
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(err => Promise.reject(err))
      } return res.json()
    })
    .then(data => {
      callback(data)
    })
}