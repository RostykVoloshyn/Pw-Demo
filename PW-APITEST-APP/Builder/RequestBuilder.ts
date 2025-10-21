import { APIRequestContext } from '@playwright/test';

export class RequestBuilder {
  private method: string;
  private url: string;
  private headers: Record<string, string>;
  private queryParams: URLSearchParams;
  private payload: Record<string, any> | null;

  constructor(private request: APIRequestContext) {
    this.method = 'GET'; // Default method
    this.url = '';
    this.headers = {};
    this.queryParams = new URLSearchParams();
    this.payload = null;
  }

  setMethod(method: string): RequestBuilder {
    this.method = method.toUpperCase();
    return this;
  }

  setUrl(url: string): RequestBuilder {
    this.url = url;
    return this;
  }

  addHeader(key: string, value: string): RequestBuilder {
    this.headers[key] = value;
    return this;
  }

  addQueryParam(key: string, value: string): RequestBuilder {
    this.queryParams.append(key, value);
    return this;
  }

  setPayload(payload: Record<string, any>): RequestBuilder {
    this.payload = payload;
    return this;
  }

  async send(): Promise<any> {
    const finalUrl = `${this.url}?${this.queryParams.toString()}`;
    const options: Record<string, any> = {
      method: this.method,
      headers: this.headers,
    };

    if (this.payload && (this.method === 'POST' || this.method === 'PUT')) {
      options.data = this.payload;
    }

    // Use Playwright's APIRequestContext to send the request
    const response = await this.request.fetch(finalUrl, options);
    return response.json(); // Parse JSON response
  }
}
