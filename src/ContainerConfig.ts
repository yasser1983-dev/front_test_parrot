import {container} from 'tsyringe';
import {SalesService} from './services/salesServices';
import {ReportService} from "./services/reportServices";
import {AuthServices} from "./services/authServices";

container.registerSingleton(AuthServices);

container.registerSingleton(ReportService);

container.registerSingleton<SalesService>(SalesService);