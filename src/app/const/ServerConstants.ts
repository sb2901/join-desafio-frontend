import { HttpHeaders } from "@angular/common/http";

export const SERVER: string = "http://192.168.0.6:8080";

export const HTTP_OPTIONS_JSON = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };