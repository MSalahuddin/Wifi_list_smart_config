// import base64 from "base-64";
import { create } from "apisauce";
// import {
//     API_LOG,
//     API_TIMEOUT,
//     API_PASSWORD,
//     API_USER_NAME
// } from "../config/WebService";
// import { DataHelper, ErrorsObjectsHelper } from "../helpers";

// import Utils from "../util";
import { baseUrl } from "../config/WebServices";
const base_Url = baseUrl;

getUpdatedHeader = headers => {
  //const accessToken = DataHelper.getAccessToken();
  const accessToken = undefined;
  if (!headers) {
    headers = {};
  }

  //headers.platform = Utils.getPlatformForService();

  if (accessToken) {
    return {
      ...headers,
      Authorization: `Basic ${accessToken}`
    };
  } else {
    return headers;
  }
};

const api = create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

class ApiSauce {
  //   async delete(url, data, headers) {
  //     const updatedHeader = getUpdatedHeader(headers);

  //     const response = await api.delete(url, data, { headers: updatedHeader });

  //     if (__DEV__ && API_LOG) {
  //       console.log(response);
  //     }

  //     return new Promise((resolve, reject) => {
  //       this.handlePromise(resolve, reject, response);
  //     });
  //   }

  //   async put(url, data, headers) {
  //     const updatedHeader = getUpdatedHeader(headers);

  //     const response = await api.put(url, data, { headers: updatedHeader });

  //     if (__DEV__ && API_LOG) {
  //       console.log(response);
  //     }

  //     return new Promise((resolve, reject) => {
  //       this.handlePromise(resolve, reject, response);
  //     });
  //   }

  // for normal post requests

  async post(url, data, headers) {
    //const updatedHeader = getUpdatedHeader(headers);
    updatedHeader = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const response = await api.post(url, data, { headers: updatedHeader });

    return new Promise((resolve, reject) => {
      this.handlePromise(resolve, reject, response);
    });
  }

  // for simple get request
  //   async get(url, data, headers) {
  //     const updatedHeader = getUpdatedHeader(headers);
  //     const response = await api.get(url, data, { headers: updatedHeader });

  //     if (__DEV__ && API_LOG) {
  //       console.log(response);
  //     }

  //     return new Promise((resolve, reject) => {
  //       this.handlePromise(resolve, reject, response);
  //     });
  //   }

  // for uploading images
  //   async postImage(url, data) {
  //     const response = await api.post(url, data);

  //     if (__DEV__ && API_LOG) {
  //       console.log(response);
  //     }
  //     return new Promise((resolve, reject) => {
  //       this.handlePromise(resolve, reject, response);
  //     });
  //   }

  //   changeUrl(newURL: String) {
  //     api.setBaseURL(newURL);
  //   }

  handlePromise = (resolve, reject, response) => {
    if (response.ok && response.data && !response.data.error) {
      resolve(response.data);
    } else {
      console.log(response, "99999999990000000");
      reject(response.data.message);
    }
  };
}

export default new ApiSauce();
