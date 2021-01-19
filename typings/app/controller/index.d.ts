// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticle from '../../../app/controller/article';
import ExportDashboard from '../../../app/controller/dashboard';
import ExportGadget from '../../../app/controller/gadget';
import ExportHome from '../../../app/controller/home';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    article: ExportArticle;
    dashboard: ExportDashboard;
    gadget: ExportGadget;
    home: ExportHome;
    user: ExportUser;
  }
}
