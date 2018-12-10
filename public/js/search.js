var API_KEY_COOKIE = 'bing-search-api-key'
var CLIENT_ID_COOKIE = 'bing-search-client-id'

var BING_ENDPOINT=  'https://api.cognitive.microsoft.com/bing/v7.0/images/search';

try{
  localStorage.getItem
}catch(e){
  console.log('localstorage seem not working')
}