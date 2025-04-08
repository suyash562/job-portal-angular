import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private webSocketClient$! : WebSocketSubject<any>;
  
  get webSocketClient(){
    return this.webSocketClient$.asObservable();
  }
  
  connectToWebSocketServer(){
    this.webSocketClient$ = webSocket(`ws://localhost:8080/${sessionStorage.getItem('email')}`);
  }
}
