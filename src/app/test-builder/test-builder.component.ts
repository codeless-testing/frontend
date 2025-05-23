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
import {fromEvent, skip, Subject, takeUntil} from "rxjs";


@Component({
  selector: 'app-test-builder',
  templateUrl: './test-builder.component.html',
  styleUrls: ['./test-builder.component.scss']
})
export class TestBuilderComponent implements OnInit, AfterViewInit, OnDestroy {
  targetUrl = 'https://staging.d1dw0ba7wgect1.amplifyapp.com/auth/login';
  casesId: string = '';
  data: CasesModel | null = null;
  html: any;

  $onDestroy: Subject<void> = new Subject<void>();

  @ViewChild('frame', { static: true }) frame!: ElementRef<HTMLIFrameElement>;

  private readonly onMessage = this.handleMessage.bind(this);
  trustedUrl: SafeResourceUrl | undefined;
  public iconNames = IconNamesEnum;
  iframePath: any;
  isInspectorActive: boolean = false;
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
    this.frame.nativeElement.addEventListener('message', (event) => {
      console.log(event)
    });

    fromEvent(this.frame.nativeElement, 'load')
      // Skip the initial load event and only capture subsequent events.
      .pipe(skip(1))
      .subscribe((event: Event) => {
        this.iframePath = event.target
      });
  }

  activeInspect() {
    this.isInspectorActive = true;
    this.frame.nativeElement.contentWindow!.postMessage(
      { type: 'ELEMENT_PICKER_TOGGLE', active: true },
      this.targetUrl          // never use '*' in production
    );
  }

  disableInspect() {
    this.isInspectorActive = false;
    this.frame.nativeElement.contentWindow!.postMessage(
      { type: 'ELEMENT_PICKER_TOGGLE', active: false },
      this.targetUrl          // never use '*' in production
    );
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

        const rawHtml = e.data.detail.outerHTML;
        const tag = e.data.detail.tag;

        const parser = new DOMParser();
        const doc    = parser.parseFromString(rawHtml, 'text/html');

        this.getDataFromIframe(doc.body, tag)
      });
    }
  }

  getDataFromIframe(data: any, tag: string) {
    const div = data.firstElementChild as HTMLElement;
    const className= div.className;

    console.log('User picked:', {
      className,
      tag
    });
    this.html = className;
    this.openCreateTestCaseModal();
  }

  openCreateTestCaseModal() {
    const dialog = this.matDialog.open(CreateTestCaseComponent, {

    })
  }

  ngOnDestroy(): void {
    window.removeEventListener('message', this.onMessage);
    this.$onDestroy.complete();
  }

  updateChanges() {

  }

  getIframeSrc() {
    if (this.frame.nativeElement.src) {
      // console.log(this.frame.nativeElement.contentWindow.)
      const url = new URL(this.frame.nativeElement.src);
      return url.pathname
    }
    return ''
  }
}
