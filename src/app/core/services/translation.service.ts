import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
private readonly _TranslateService = inject(TranslateService);
private readonly _PLATFORM_ID = inject(PLATFORM_ID);
private readonly _Renderer2 = inject(RendererFactory2).createRenderer(null, null)

  constructor() {
    if(isPlatformBrowser(this._PLATFORM_ID)){
      this._TranslateService.setDefaultLang('en');
      this.setLanguage();
    }
  }

  setLanguage():void {
    let savedLang = localStorage.getItem('lang');
    if(savedLang){
      this._TranslateService.use(savedLang);
    }
    if(localStorage.getItem('lang') === 'en'){
      this._Renderer2.setAttribute(document.documentElement, 'dir' , 'ltr');
      this._Renderer2.setAttribute(document.documentElement, 'lang' , 'en');
    }
    else if (localStorage.getItem('lang') === 'ar') {
      this._Renderer2.setAttribute(document.documentElement, 'dir' , 'rtl');
      this._Renderer2.setAttribute(document.documentElement, 'lang' , 'ar');
    }
  }

  changeLang(lang : string):void {
    if(isPlatformBrowser(this._PLATFORM_ID)){
      localStorage.setItem('lang'  , lang);
      this.setLanguage();
    }
  }
}
