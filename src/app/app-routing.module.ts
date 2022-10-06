import { NgModule, Component } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard/dashboard.component";
import { ListComponent } from "./list/list/list.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./dashboard/dashboard.module").then(m => m.DashboardModule)
  },
  {
    path: "list",
    loadChildren: () => import("./list/list.module").then(m => m.ListModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule {
}
