import {container} from 'tsyringe';
import {SalesService} from './features/orders/SalesServices';
import {ReportService} from "./features/reports/ReportServices";
import {AuthServices} from "./features/auth/AuthServices";

container.registerSingleton(AuthServices);

container.registerSingleton(ReportService);

container.registerSingleton<SalesService>(SalesService);