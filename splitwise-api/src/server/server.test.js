const assert = require("assert");
const http = require("http");
const https = require("https");
const app = require("./server");
const bodyParser = require("body-parser");
var request = require("request");
var Agent = require("https");
const { url } = require("inspector");

var jsonParser = bodyParser.json();

describe("GET users API call", () => {
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
      default_currency: "CAD",
      email: "aditya@gmail.com",
      id: 3,
      image_path:
        "https://splitwise-bucket.s3.amazonaws.com/8B7FB326-154E-429A-BE19-DDF36953F913.jpeg",
      lang: "ENGLISH",
      name: "Aditya Baravkar",
      phone: "null",
      timezone: "null",
      username: null,
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

describe("PUT -Update Group profile call", () => {
  it("should update group profile", async () => {
    const data = {
      grp_name: "San Jose1",
      user: "Aditya Baravkar",
      users: [
        {
          name: "",
          email: "",
        },
        {
          name: "",
          email: "",
        },
        {
          name: "",
          email: "",
        },
        {
          name: "",
          email: "",
        },
      ],
      imgPath:
        "https://splitwise-bucket.s3.amazonaws.com/8A44A25C-742A-4EA7-8210-8A9A8161D657.jpeg",
      grp_id: 2,
    };
    await put("/api/group/", data).then((response) => {
      console.log();
      assert.deepStrictEqual(response.message, "Group Updated Successfully");
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
