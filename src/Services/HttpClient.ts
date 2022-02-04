import axios from "axios";
export class HttpClient {
  baseUrl: string;
  static instance: HttpClient;
  constructor(baseUrl: string = "") {
    if (HttpClient.instance instanceof HttpClient) {
      return HttpClient.instance;
    } else {
      this.baseUrl = baseUrl;
      HttpClient.instance = this;
      Object.freeze(this);
    }
  }
  get(url: string, headers: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get(this.baseUrl + url, {
          headers: headers,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  post(url: string, data: any, headers: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .post(this.baseUrl + url, data, {
          headers: headers,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  put(url: string, data: any, headers: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .put(this.baseUrl + url, data, {
          headers: headers,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  delete(url: string, headers: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .delete(this.baseUrl + url, {
          headers: headers,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
