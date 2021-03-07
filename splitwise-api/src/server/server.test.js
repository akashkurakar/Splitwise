const assert = require('assert'); 
const http = require('http');
const https = require('https');
const app = require('./server')
const bodyParser = require('body-parser');
var request = require("request");
 var Agent =require('https');
const { url } = require('inspector');

var jsonParser = bodyParser.json();

describe('GET users API call', () => {
    it('should return LIST OF USERS', async () => {
      await get('http://127.0.0.1:3001/api/users').then(response=>{
        //console.log(response);
        assert.deepStrictEqual(response.length>0,true)
       });
       
        
        });
   
});
describe('POST users API call', () => {
it('should authenticate user', async () => {
    const data={
        email:"akash@gmail.com",
        password:"akash"
    }
    await post(data).then(response=>{
      console.log();
      assert.deepStrictEqual(response.message,"Login Successfull");
     });
      });
 
    });
const post = async(data) => {
    const options = {
        hostname: '127.0.0.1',
        port: 3001,
        path: '/api/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      }
      return new Promise((resolve, reject) => {
      const req = http.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
      let data="";
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            resolve(JSON.parse(data));
        });
      })
      
      req.on('error', error => {
        reject(error)
      })
      
      req.write(JSON.stringify(data))
      req.end()
    })
}

const get = async(url) => {
    return new Promise((resolve, reject) => {
        http.get(url, (resp) => {
            let data = '';
            resp.on('data', chunk => data += chunk);
            resp.on('end', () => {
                resolve(JSON.parse(data));
            });
        }).on("error", reject);
    })
}

