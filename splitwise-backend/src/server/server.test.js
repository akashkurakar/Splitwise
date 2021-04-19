const assert = require("assert");
const http = require("http");
const https = require("https");
const app = require("./server");
const bodyParser = require("body-parser");
var request = require("request");
var Agent = require("https");
const { url } = require("inspector");

var jsonParser = bodyParser.json();

describe("get users API call", () => {
  it("should return LIST OF USERS", async () => {
    await get("http://127.0.0.1:3001/api/users").then((response) => {
      assert.deepStrictEqual(response.length > 0, true);
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
      console.log();
      assert.deepStrictEqual(response.message, "Login Successfull");
    });
  });
});

describe("PUT -Update user profile call", () => {
  it("should update user profile", async () => {
    const data = {
      id: 21,
      name: "Aditya",
      username: null,
      email: "aditya@gmail.com",
      password: "$2b$10$CMW8YBvCpEBmlCh1YnTJ/e1b4lTJtBceRIPGBNzZJp.PEaNpzKLCW",
      phone: "null",
      default_currency: "CAD",
      image_path:
        "https://splitwise-bucket.s3.amazonaws.com/8B7FB326-154E-429A-BE19-DDF36953F913.jpeg",
      lang: "ENGLISH",
      timezone: "null",
    };
    await put("/api/user/update", data).then((response) => {
      console.log();
      assert.deepStrictEqual(response.message, "Update Successfull");
    });
  });
});

describe("GET users balances API call", () => {
  it("should return balances of user", async () => {
    await get("http://127.0.0.1:3001/api/balances/?user=3").then((response) => {
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
      assert.deepStrictEqual(response, "Transaction Settled");
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
