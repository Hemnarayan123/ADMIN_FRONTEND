import { useState } from 'react'
import { toast } from 'react-toastify'
import AxiosHelper from '../../helper/AxiosHelper';

const Status = ({ data_id, status: defaultStatus, table }) => {
    const [status, setstatus] = useState(defaultStatus)
    const toggleStatus = async () => {
        var { data } = await AxiosHelper.deleteData(`admin/toggle-status/${table}/${data_id}`);
        if (data?.status === true) {
            setstatus(!status)
            toast.success(data?.message);
        } else {
            toast.error(data?.message);
        }
    }

    return (
        <>
            {status ? <small onClick={toggleStatus} className="badge fw-semi-bold rounded-pill status badge-soft-success cursor-pointer">
                Able <span className="ms-1 fas fa-check" data-fa-transform="shrink-2"></span>
            </small> : <small onClick={toggleStatus} className="badge fw-semi-bold rounded-pill status badge-soft-danger cursor-pointer">
                Disable <span className="ms-1 fas fa-ban" data-fa-transform="shrink-2"></span>
            </small>}
        </>
    )
}

export default Status