const assert = require("assert");
const http = require("http");
const https = require("https");
const bodyParser = require("body-parser");
var request = require("request");
var Agent = require("https");
const { url } = require("inspector");
const app = require("./server");
var jsonParser = bodyParser.json();
before((done) => {
  app.on("app_started", function () {
    done();
  });
});

describe("get users API call", () => {
  it("should return LIST OF USERS", async () => {
    await get("http://127.0.0.1:3001/api/users").then((response) => {
      //console.log(response.data);
      assert.deepStrictEqual(response.data.length > 0, true);
    });
  });
});

describe("POST users API call", () => {
  it("should authenticate user", async () => {
    const data = {
      email: "akash@gmail.com",
      password: "akash",
    };
    await post(data).then((response) => {
      assert.deepStrictEqual(response.message, "Invalid Credentials");
    });
  });
});

describe("PUT -Update user profile call", () => {
  it("should update user profile", async () => {
    const data = {
      default_currency: "USD",
      language: "ENGLISH",
      timezone: "GMT",
      _id: "607af0bd44d0fd076dfc4aae",
      name: "Karan Shelke",
      email: "karan@gmail.com",
      password: "$2b$10$qm.Lie6AeAXHWlnbsZuOxOsUuFMT0gyWhA1UfOotUEXwrXpo9w2aG",
      createdAt: "2021-04-17T14:29:17.185Z",
      updatedAt: "2021-04-17T14:29:17.185Z",
      __v: 0,
    };
    await put("/api/user/update", data).then((response, err) => {
      if (err) {
        console.log(err);
      }
      assert.deepStrictEqual(
        response.message,
        "Email with same ID already present!"
      );
    });
  });
});

describe("GET users balances API call", () => {
  it("should return balances of user", async () => {
    await get("http://127.0.0.1:3001/api/balances/?user=3").then((response) => {
      console.log("Balances------" + response);
      assert.deepStrictEqual(response.data !== "", true);
    });
  });
});

describe("POST -Settle balances between users", () => {
  it("should settle transaction between users", async () => {
    const data = {
      user1: 20,
      user2: 21,
    };
    await put("/api/transactions/settle", data).then((response) => {
      assert.deepStrictEqual(response.message, "Transaction Settled");
    });
  });
});

const post = async (data) => {
  const options = {
    hostname: "127.0.0.1",
    port: 3001,
    path: "/api/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization:
        "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjA3YWVmM2FmODY2ZTcwNzNkMWI5YTliIiwiaWF0IjoxNjE5MDYyMDAyLCJleHAiOjE2MjAwNzAwMDJ9.f9gOQdNfqM7IbmGptKhwkOCjmrW-wZWHdEW1UO008eA",
    },
  };
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`);
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        resolve(JSON.parse(data));
      });
    });
    req.on("error", (error) => {
      reject(error);
    });
    req.write(JSON.stringify(data));
    req.end();
  });
};

const put = async (url, data) => {
  const options = {
    hostname: "127.0.0.1",
    port: 3001,
    path: url,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization:
        "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjA3YWVmM2FmODY2ZTcwNzNkMWI5YTliIiwiaWF0IjoxNjE5MDYyMDAyLCJleHAiOjE2MjAwNzAwMDJ9.f9gOQdNfqM7IbmGptKhwkOCjmrW-wZWHdEW1UO008eA",
    },
  };
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`);
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        resolve(JSON.parse(data));
      });
    });
    req.on("error", (error) => {
      reject(error);
    });
    req.write(JSON.stringify(data));
    req.end();
  });
};

const get = async (url) => {
  return new Promise((resolve, reject) => {
    http
      .get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => (data += chunk));
        resp.on("end", () => {
          resolve(JSON.parse(data));
        });
      })
      .on("error", reject);
  });
};
