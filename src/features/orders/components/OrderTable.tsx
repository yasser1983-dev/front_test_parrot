import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {OrderInterface} from "../../../types/interfaces";


const OrderTable = ({orders}: { orders: OrderInterface[] }) => (
    <div style={{display: 'flex', justifyContent: 'center'}}>
        <DataTable value={[...orders].reverse()} tableStyle={{minWidth: '50rem', maxWidth: '1000px'}}
                   emptyMessage="No hay contenidos disponibles.">
            <Column field="customerName" header="Comensal"/>
            <Column field="itemName" header="Artículo" />
            <Column field="quantity" header="Cantidad" bodyStyle={{textAlign: 'center'}}/>
            <Column field="totalCost" header="Total" bodyStyle={{textAlign: 'center'}}/>
        </DataTable>
    </div>
);

export default OrderTable;
