import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarService, ISidebar } from '../sidebar/sidebar.service';
import { Router } from '@angular/router';
import { LangService, Language } from 'src/app/shared/lang.service';
import { environment } from 'src/environments/environment';
import { GetSessionUser, isMobileCheck } from 'src/app/constants/functions';
import { CacheService } from 'src/app/shared/cache-service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html'
})
export class TopnavComponent implements OnInit, OnDestroy {
  sidebar: ISidebar;
  subscription: Subscription;
  displayName = 'Sales';
  languages: Language[];
  currentLanguage: string;
  isSingleLang;
  isFullScreen = false;
  isDarkModeActive = false;
  searchKey = '';

  constructor(private sidebarService: SidebarService, private router: Router, 
    private cache:CacheService,
    private langService: LangService) {
    this.languages = this.langService.supportedLanguages;
    this.currentLanguage = this.langService.languageShorthand;
    this.isSingleLang = this.langService.isSingleLang;
    this.isDarkModeActive = this.getColor().indexOf('dark') > -1 ? true : false;
  }

  onDarkModeChange(event) {
    let color = this.getColor();
    if (color.indexOf('dark') > -1) {
      color = color.replace('dark', 'light');
    } else if (color.indexOf('light') > -1) {
      color = color.replace('light', 'dark');
    }
    localStorage.setItem(environment.themeColorStorageKey, color);
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }

  getColor() {
    return localStorage.getItem(environment.themeColorStorageKey)
      ? localStorage.getItem(environment.themeColorStorageKey)
      : environment.defaultColor;
  }

  fullScreenClick() {
    this.isFullScreen = !this.isFullScreen;
    if (this.isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  onLanguageChange(lang) {
    this.langService.language = lang.code;
    this.currentLanguage = this.langService.languageShorthand;
  }

  ngOnInit() {
    this.subscription = this.sidebarService.getSidebar().subscribe(
      res => {
        this.sidebar = res;
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
    var user = GetSessionUser();
    if (user) {
      this.displayName = this.cache.usuario.Nombre;
    }

    let movil=isMobileCheck.any();
    if(movil){
      this.displayName='';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  menuButtonClick = (e: { stopPropagation: () => void; }, menuClickCount: number, containerClassnames: string) => {
    if (e) { e.stopPropagation(); }

    setTimeout(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350);

    this.sidebarService.setContainerClassnames(
      ++menuClickCount,
      containerClassnames,
      this.sidebar.selectedMenuHasSubItems
    );
  }

  mobileMenuButtonClick = (event: { stopPropagation: () => void; }, containerClassnames: string) => {
    if (event) { event.stopPropagation(); }
    this.sidebarService.clickOnMobileMenu(containerClassnames);
  }

  onSignOut() {
    GetSessionUser(true);
    window.location.reload();

  }

  searchKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.search();
    } else if (event.key === 'Escape') {
      const input = document.querySelector('.mobile-view');
      if (input && input.classList) { input.classList.remove('mobile-view'); }
      this.searchKey = '';
    }
  }

  searchAreaClick(event) {
    event.stopPropagation();
  }
  searchClick(event) {
    if (window.innerWidth < environment.menuHiddenBreakpoint) {
      let elem = event.target;
      if (!event.target.classList.contains('search')) {
        if (event.target.parentElement.classList.contains('search')) {
          elem = event.target.parentElement;
        } else if (
          event.target.parentElement.parentElement.classList.contains('search')
        ) {
          elem = event.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains('mobile-view')) {
        this.search();
        elem.classList.remove('mobile-view');
      } else {
        elem.classList.add('mobile-view');
      }
    } else {
      this.search();
    }
    event.stopPropagation();
  }

  search() {
    if (this.searchKey && this.searchKey.length > 1) {
      this.router.navigate(['/app/pages/miscellaneous/search'], { queryParams: { key: this.searchKey.toLowerCase().trim() } });
      this.searchKey = '';
    }
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event) {
    const input = document.querySelector('.mobile-view');
    if (input && input.classList) { input.classList.remove('mobile-view'); }
    this.searchKey = '';
  }
}
