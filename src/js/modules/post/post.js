export default class PostData {
  constructor({url = null, method = 'POST', dataType = 'json', headers = {} }) {
    this.url = url;
    this.method = method;
    this.dataType = dataType;
    this.headers = null;
    this.request = null;
    this.body = null;
    this.data = null;

  }

  init() {
    this.createHeaders();

  }

  createHeaders() {
    let contentType;
    
    switch (this.dataType) {
      case 'json':
        contentType = 'application/json; charset=UTF-8';
        break;
  
      case 'form-data': 
        contentType = 'multipart/form-data';
        break;
  
      default:
        contentType = 'application/json; charset=UTF-8';
        break;
    }

    const headers = new Headers();
    headers.append('content-type',contentType);
    
    for (let headerName in this.headers) {
      headers.append(headerName, headers[headerName]);
    }

    this.headers = headers;
  }

  createRequest() {
    return new Request(this.url, {
      headers: this.headers,
      method: this.method,
      body: this.body,
    });

  }

  sendPost(data) {
    this.data = data;
    this.body = this.getBody();
    this.request = this.createRequest();

    return fetch(this.request);
  }

  getBody() {
    return this.dataType === 'json' ? JSON.stringify(this.data) : this.data;
  }


}