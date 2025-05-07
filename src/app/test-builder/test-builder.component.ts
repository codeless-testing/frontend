import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InjectionScript} from '../core/scripts/injection-script'
import {DomSanitizer, EventManager, SafeResourceUrl, SafeUrl} from "@angular/platform-browser";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-test-builder',
  templateUrl: './test-builder.component.html',
  styleUrls: ['./test-builder.component.scss']
})
export class TestBuilderComponent implements OnInit, AfterViewInit {
  targetUrl = 'https://d3tsi0wyyqncdr.cloudfront.net/';

  @ViewChild('frame', {static: true})
  frame!: ElementRef<HTMLIFrameElement>;
  trustedUrl: SafeResourceUrl | undefined;

  constructor(
    private sanitizer: DomSanitizer,
    private eventManager: EventManager) {
  }

  ngOnInit() {
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.targetUrl);
  }

  ngAfterViewInit(): void {
    this.frame.nativeElement.addEventListener('load', () => {
      // enable the picker
      // const enablePicker = () => {
    console.log(this.frame)
        this.frame.nativeElement.contentWindow?.postMessage({ type: 'ELEMENT_PICKER_TOGGLE', active: true }, '*');
      // }

      // disable (or cancel) the picker
      // const disablePicker = () => {
      //   this.frame.nativeElement?.contentWindow?postMessage({ type: 'ELEMENT_PICKER_TOGGLE', active: false }, '*');
      // }

      // listen for the element‑selected event bubbling out of the iframe
      window.addEventListener('message', (e: any) => {
        if (e.data.type === 'element-selected') {

          console.log('User picked:', e);
          const html = this.sanitizer.bypassSecurityTrustHtml(e.outerHTML);
          console.log(html)
        }
      });
    });
  }
}
