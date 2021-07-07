export interface StudentSubSession {
    SubsessionId:number;
    SubsessionTitle:string;
    Description:string;
    Title:string;
    Index:string;
}

export class StudentSubsessionDetails {

    StudentID:number=0;
    SubsessionID:number=0;
    Subsession:Subsession={QuestionDetails:[],SubsessionDeatils:{IsExtraQuestionNeeded:0,NotationOne:'',NotationOneTitle:'',NotationTwo:'',NotationTwoTitle:'',SubsessionTitle:'',TotalQuestionCount:0}};
}
export interface Subsession{
    QuestionDetails:QuestionDetails[];
    SubsessionDeatils:SubsessionDeatils;
}
export interface QuestionDetails{
    PageNumber:number;
    QuestionDetails:string;
    QuestionDetailsModel:QuestionDetailsModel[];
}
export interface QuestionDetailsModel{
    QuestionID:number;
    Question:string;
    Selected:string;
}
export class SubsessionDeatils {
    NotationOneTitle:string='';
    NotationTwoTitle:string='';
    NotationOne:string='';
    NotationTwo:string='';
    IsExtraQuestionNeeded:number=0;
    SubsessionTitle:string='';
    TotalQuestionCount:number=0;
}

