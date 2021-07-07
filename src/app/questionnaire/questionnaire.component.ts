import { Component, OnInit ,Input } from '@angular/core';
import { QuestionnaireService } from './questionnaire.service';
import { StudentSubSession, StudentSubsessionDetails } from '../models/student-sub-session';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {

  studentSubSessionList: StudentSubSession[] = [];
  studentSubsessionDetails: StudentSubsessionDetails =
    {
      StudentID: 39,
      Subsession: { QuestionDetails: [], SubsessionDeatils: { IsExtraQuestionNeeded: 0, NotationOne: '', NotationOneTitle: '', NotationTwo: '', NotationTwoTitle: '', SubsessionTitle: '', TotalQuestionCount: 0 } },
      SubsessionID: 1
    };

  currentPageNumber: number = 1;//for pagination
  loader: boolean = false;// for loader
  fireBaseClientToken: string;// firebase client tokens
  @Input() label: string;
  constructor(private service: QuestionnaireService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    var CacheData = localStorage.getItem('0f1596e5b2017e4879395ed80fe0f8aae266575');
    if (CacheData != undefined && CacheData != "") {//checking for firebase token exist or not
      this.fireBaseClientToken = JSON.parse(CacheData);
    }
    this.fetchStudentSubSesion();//get subsessions
  }
  fetchStudentSubSesion() {//get subsessions

    const body = {
      studentId: this.studentSubsessionDetails.StudentID,
      sessionId: this.studentSubsessionDetails.SubsessionID
    }
    this.loader = true;//show loader
    this.service.fetchStudentSubSession(body).subscribe((res: any) => {
      this.loader = false;//hide loader
      this.studentSubSessionList = res;
    })
  }
  fetchSubsessionDetails(SubsessionId: number) {//get subsessions details

    const body = {
      StudentID: this.studentSubsessionDetails.StudentID,
      SubsessionID: SubsessionId
    }
    this.loader = true;//show loader
    this.service.fetchSubsessionDetails(body).subscribe((res: any) => {
      this.loader = false;//hide loader
      this.studentSubsessionDetails = res;
      this.studentSubsessionDetails.Subsession.QuestionDetails.forEach(element => {
        element.QuestionDetailsModel.forEach(element2 => {
          element2.Selected = '';//To store answer field
        });
      });
    })
  }

  tabChanged(event: any) {//material tab click event
    this.currentPageNumber = 1;
    this.fetchSubsessionDetails(event.index + 1);
    this.sendPushNotification(0);//send push notification
  }
  nextButtonClicked(index: number) {//next button click event
    var nonSelectedExist = false;//To check not answered question
    this.studentSubsessionDetails.Subsession.QuestionDetails[index].QuestionDetailsModel.forEach(element => {
      if (element.Selected == "") {
        nonSelectedExist = true;
        return;
      }
    });
    if (nonSelectedExist) {//Unfilled question exist
      this.openSnackBar("Please fill all the questions", "");
      return;
    }
    this.sendPushNotification(this.currentPageNumber);//send push notification
    this.currentPageNumber++;//Move to next page
  }
  saveButtonClicked(index: number) {//save button click event
    var nonSelectedExist = false;//To check not answered question
    this.studentSubsessionDetails.Subsession.QuestionDetails[index].QuestionDetailsModel.forEach(element => {
      if (element.Selected == "") {
        nonSelectedExist = true;
        return;
      }
    });
    if (nonSelectedExist) {//Unfilled question exist
      this.openSnackBar("Please fill all the questions", "");
      return;
    }
    this.sendPushNotification(this.currentPageNumber);//send push notification

  }
  sendPushNotification(currentPageNumber) {//send push notification
    let body = {
      notification: {
        title: currentPageNumber,
        body: "Hi this is sample angular app"
      },
      to: this.fireBaseClientToken
    }
    this.service.sendPushNotification(JSON.stringify(body)).subscribe((res: any) => { });
  }

  openSnackBar(message: string, action: string) {//snackbar 
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
