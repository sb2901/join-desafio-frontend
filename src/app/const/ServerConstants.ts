import { HttpHeaders } from "@angular/common/http";

export const SERVER: string = "http://192.168.0.6:8080";

export const HTTP_OPTIONS_JSON = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  export const PRODUCT: string = "/product";

  export const CATEGORY: string = "/category";

  export const ERROR: string = "/error";

  export const LOGIN: string = "/login";

  

