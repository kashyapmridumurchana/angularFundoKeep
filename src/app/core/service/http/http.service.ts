import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http : HttpClient) {}

  postService(url,object){
    return this.http.post<any>(url,object,{observe : 'response'});
  }

  putService(url,object,header){
    return this.http.put<any>(url,object,header);
  }

  getService(url,header){
    return this.http.get<any>(url,header);
  }

  deleteService(url,header){
    return this.http.delete<any>(url,header);
  }

  postServiceWithParam(url,params){
    return this.http.post<any>(url,null,params);
  }

  deleteServiceWithParams(url,params){
    return this.http.delete(url,params);
  }

  putServiceWithParams(url,params){
    return this.http.post(url,params);
  }



 postServiceForNoteCreate(url,object,header,){
  return this.http.post<any>(url,object,header);
}
putServiceForNoteUpdate(url,object,header){
  return this.http.put<any>(url,object,header);
}

deleteServiceForNoteDelete(url,header){
  return this.http.delete<any>(url,header);
}

putServiceWithParam(url,object){
  return this.http.put<any>(url,object,{observe : 'response'});
}


}


