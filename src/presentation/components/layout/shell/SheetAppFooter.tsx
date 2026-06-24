import { APP_SUBTITLE, APP_TITLE } from '../../../../shared/constants/appLabels';
import { SHELL_UI } from '../../../../shared/constants/shellLabels';

export function SheetAppFooter() {
  return (
    <footer className="st-app-footer">
      <div className="st-app-footer__inner">
        <div className="st-app-footer__brand">
          <p className="st-app-footer__title">{APP_TITLE}</p>
          <p className="st-app-footer__subtitle">{APP_SUBTITLE}</p>
        </div>
        <div className="st-app-footer__meta">
          <p className="st-app-footer__credit">{SHELL_UI.footerCredit}</p>
          <p className="st-app-footer__storage">{SHELL_UI.footerStorage}</p>
        </div>
      </div>
    </footer>
  );
}
