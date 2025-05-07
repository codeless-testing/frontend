import {AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { InjectionScript } from '../core/scripts/injection-script'
import { DomSanitizer, EventManager, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";
import { environment } from "../../environments/environment";
import { IconNamesEnum } from 'ngx-bootstrap-icons';
import { MatDialog } from '@angular/material/dialog';
import { CreateTestCaseComponent } from './create-test-case/create-test-case.component';
import {ActivatedRoute} from "@angular/router";
import {CasesService} from "../core/services/cases.service";
import {CasesModel} from "../core/models/cases.model";
import {Subject, takeUntil} from "rxjs";


@Component({
  selector: 'app-test-builder',
  templateUrl: './test-builder.component.html',
  styleUrls: ['./test-builder.component.scss']
})
export class TestBuilderComponent implements OnInit, AfterViewInit, OnDestroy {
  targetUrl = 'https://d3tsi0wyyqncdr.cloudfront.net';
  casesId: string = '';
  data: CasesModel | null = null;

  $onDestroy: Subject<void> = new Subject<void>();

  @ViewChild('frame', { static: true }) frame!: ElementRef<HTMLIFrameElement>;

  private readonly onMessage = this.handleMessage.bind(this);
  trustedUrl: SafeResourceUrl | undefined;
  public iconNames = IconNamesEnum;
  constructor(
    private sanitizer: DomSanitizer,
    private zone: NgZone,
    private eventManager: EventManager,
    private matDialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private casesService: CasesService,
  ) {
  }

  ngOnInit() {
    this.casesId = this.activeRoute.snapshot.params['id'];
    this.getData();
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.targetUrl);
  }

  getData(){
    this.casesService.getCasesById(this.casesId).pipe(takeUntil(this.$onDestroy)).subscribe((res) => this.data = res);
  }


  ngAfterViewInit(): void {
    /* 1️⃣  add the listener FIRST, outside of `load` */
    window.addEventListener('message', this.onMessage);

    /* 2️⃣  wait for the iframe to load, then talk to it */
    this.frame.nativeElement.addEventListener('load', () => {
      this.frame.nativeElement.contentWindow!.postMessage(
        { type: 'ELEMENT_PICKER_TOGGLE', active: true },
        this.targetUrl          // never use '*' in production
      );
    });
  }

  private handleMessage(e: MessageEvent): void {
    /* 3️⃣  accept only messages that really come from our iframe */
    // if (
    //   e.origin !== this.targetUrl ||
    //   e.source !== this.frame.nativeElement.contentWindow
    // ) {
    //   return;                                    // ignore everything else
    // }

    if (e.data?.type === 'element-selected') {
      console.log(e.data)
      /* 4️⃣  hop back into Angular’s zone so change detection runs */
      this.zone.run(() => {
        const html = this.sanitizer.bypassSecurityTrustHtml(e.data.detail.outerHTML);
        console.log('User picked:', html);
      });
    }
  }

  openCreateTestCaseModal() {
    const dialog = this.matDialog.open(CreateTestCaseComponent, {

    })
  }

  ngOnDestroy(): void {
    window.removeEventListener('message', this.onMessage);
    this.$onDestroy.complete();
  }

}
