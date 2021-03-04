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

    // using async
    it('should return LIST OF USERS (using async)', async () => {
      await get('http://127.0.0.1:3001/api/users').then(response=>{
        console.log(response);
        assert.deepStrictEqual(response,[
            {
              id: 1,
              name: 'Akash Kuratkar',
              username: null,
              email: 'akash@gmail.com',
              password: '$2b$10$ionN8uNAQyfN1EtVmB7TIOLu8qi78D5.RY9E7lFmiorz5IqWWJXfu',
              phone: 'null',
              default_currency: 'GBP',
              image_path: null,
              lang: 'undefined',
              timezone: 'null'
            },
            {
              id: 2,
              name: 'Aditya Baravkar',
              username: null,
              email: 'aditya@gmail.com',
              password: '$2b$10$ionN8uNAQyfN1EtVmB7TIOKNKVcFP7E3RywPIdlgJCDd2W4kqSXJ2',
              phone: 'null',
              default_currency: 'CAD',
              image_path: null,
              lang: 'undefined',
              timezone: 'null'
            }
          ])
       });
       
        
        });
   
});
it('should return LIST OF USERS (using async)', async () => {
    const data={
        email:"akash@gmail.com",
        password:"akash"
    }
    await post(data).then(response=>{
      console.log();
      assert.deepStrictEqual(response.message,"Login Successfull");
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

