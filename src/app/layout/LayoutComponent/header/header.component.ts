import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../../firebase-services/messaging.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private messagingService:MessagingService) { }

  message:any;
  notificationCounter:number=0;
  ngOnInit(): void {

    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message=this.messagingService.currentMessage;  
  }
}
