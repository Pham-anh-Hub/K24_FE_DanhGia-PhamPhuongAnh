
import { ConfirmForm } from "../components/confirmModal"
import { DataTable } from "../components/DataTable"
import { FormAddProduct } from "../components/formAddProduct"
import { Header } from "../components/Header"

export function MainLayout() {
    return (
        <div>
            <Header />
            <DataTable />
            <ConfirmForm/>
        </div>
    )
}