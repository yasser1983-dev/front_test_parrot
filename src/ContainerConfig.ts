import { container } from 'tsyringe';
import { SalesService } from './services/salesServices';
import { ReportService } from "./services/reportServices";

container.registerSingleton(ReportService);

container.registerSingleton<SalesService>(SalesService);