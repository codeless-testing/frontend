import {Component, OnInit} from '@angular/core';
import { IconNamesEnum } from 'ngx-bootstrap-icons';
import {CasesService} from "../core/services/cases.service";
import {CasesListModel} from "../core/models/cases.model";

@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.scss']
})
export class TestsListComponent implements OnInit{

  casesList: CasesListModel[] = [];

  constructor(
    private casesService: CasesService,
  ) {}

  ngOnInit() {
    this.casesService.getCasesList().subscribe((res) => {
      this.casesList = res;
    })
  }
}
