import { Injectable, Inject } from '@angular/core';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { AuthentificationService } from './authentification.service';
import { Alerte } from '../models/alerte';
import { environment } from '../../environement/environement';

@Injectable({ providedIn: 'root' })
export class AlerteSocketService {
  private stompClient!: Client;
  private alerteSubject = new Subject<any>();

  constructor(
    @Inject('WEBSOCKET_AUTH_INTERCEPTOR') private wsAuth: any,
    private authService: AuthentificationService
  ) {
    this.initializeConnection();
  }

  private initializeConnection() {
    const socket = new SockJS(`${environment.apiUrl}/ws`);
    
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: this.wsAuth.connectHeaders(),
      debug: (str) => console.log('[STOMP]', str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => this.handleConnection(),
      onStompError: (frame) => {
        console.error('WebSocket Error:', frame.headers['message']);
        this.handleReconnect();
      }
    });
    this.stompClient.activate();
  }

handleConnection() {
  this.stompClient.subscribe('/topic/alertes', (message) => {
    try {
      const alerte: Alerte = JSON.parse(message.body);
      this.alerteSubject.next(alerte);
    } catch (error) {
      console.error('Erreur lors du parsing de l\'alerte', error);
    }
  });
}

getAlerteObservable() {
  return this.alerteSubject.asObservable();
}

  private handleReconnect() {
    setTimeout(() => {
      if (!this.stompClient.connected) {
        this.stompClient.connectHeaders = this.wsAuth.connectHeaders();
        this.stompClient.activate();
      }
    }, 5000);
  }
}