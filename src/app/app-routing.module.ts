import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// layouts
import { LayoutComponent } from './layout/layout.component';

//questionnaire
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';

const routes: Routes = [
  {
    path:'home',
    component:LayoutComponent,
    children:[
      { path: "questionnaire", component: QuestionnaireComponent },
    ]
  },
  {
    path:'**',
    component:LayoutComponent,
    children:[
      { path:'**', component:QuestionnaireComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
