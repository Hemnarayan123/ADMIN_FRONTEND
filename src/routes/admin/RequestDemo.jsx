import React, { useState, useEffect, useCallback } from 'react';
import { CloseButton, Modal } from 'react-bootstrap';
import AxiosHelper from '../../helper/AxiosHelper';
import { Link } from 'react-router-dom';
import { getDeleteConfig } from '../../helper/StringHelper';
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
const MySwal = withReactContent(Swal);




const Enquiry = () => {
    const tableHeaders = ['S NO','Full name', 'Email', 'Phone', 'Company name', 'Request Type']
    const [data, setData] = useState({ count: 0, record: [], totalPages: 0, pagination: [] });
    const [param, setParam] = useState({ limit: 7, pageNo: 1, query: "" })
    const [open, setOpen] = useState(null);
    const [initialValues, setInitialValues] = useState({
        full_name : '',
        email : '',
        phone : '',
        company_name : '',
        service : '',
        request_type : ''
    })

    const fetchEnquiries = useCallback(async () => {
        const { data } = await AxiosHelper.getData(`admin/get-request-demo`, param);
        if (data.status) {
            let { count, totalPages, record, pagination } = data?.data
            setData({ count, totalPages, record, pagination });
        }
    }, [[param]])

    const handelPageChange = (pageNo) => { setParam({ ...param, pageNo }) }
    useEffect(() => { fetchEnquiries() }, [param])

    return <>
        <div className='card mb-3'>
            <div className="card-header">
                <div className="row flex-between-end">
                    <div className="col-auto align-self-center">
                        <h5 className="mb-0" data-anchor="data-anchor">Request Demo</h5>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="position-relative input-group">
                            {/* <input placeholder="Search..." onChange={(e) => setParam({ ...param, query: e.target.value, pageNo: 1 })} type="search" id="search" className="shadow-none form-control form-control-sm" /> */}
                            <input
                                placeholder="Search..."
                                onChange={(e) => {
                                    const newQuery = e.target.value;
                                    setParam({ ...param, query: newQuery, pageNo: 1 });
                                    console.log("Search query:", newQuery);
                                }}
                                type="search"
                                id="search"
                                className="shadow-none form-control form-control-sm"
                            />

                            <span className="bg-transparent input-group-text">
                                <div className="fa fa-search text-primary"></div>
                            </span>
                        </div>
                    </div>
                    <div className="col-auto ms-auto">
                        <div className="mt-2" role="tablist">
                            <Link to={`/admin/dashboard`} className="me-2 btn btn-sm btn-falcon-default">
                                <i className="fa fa-home me-1"></i>
                                <span className="d-none d-sm-inline-block ms-1">Dashboard</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="card" style={{ padding: "20px" }}>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr className="bg-gray-100 text-center">
                            {tableHeaders.map((header) => (
                                <th key={header} className="">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.record && data?.record.map((customer, index) => (
                            <tr key={index} className="text-center">
                                <td>{index + 1}</td>
                                <td>{customer.full_name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone || 'N/A'}</td>
                                <td>{customer.company_name || 'N/A'}</td>
                                <td>{customer.digi_human_options || 'N/A'}</td>
                                {/*<td>
                                     <div className="text-center d-flex gap-2">
                                        {customer.schedule ? (
                                            <button className='btn btn-sm btn-primary' onClick={() => {
                                                setOpen('view');
                                                setInitialValues(customer)
                                            }}><i className="fa-solid fa-up-right-from-square"></i></button>
                                        ) : null}
                                        <button className="btn btn-sm btn-danger" type="button" onClick={async () => {
                                            var { isConfirmed } = await MySwal.fire(getDeleteConfig({}))
                                            if (isConfirmed) {
                                                const { data } = await AxiosHelper.deleteData(`admin/delete-enquiry/${customer._id}`)
                                                
                                                if (data.status) {
                                                    fetchEnquiries();
                                                    MySwal.fire("Saved!", "", "success");
                                                    toast.success(data.message);
                                                } else {
                                                    toast.error(data.message);
                                                }
                                            }
                                        }}><i className="fa-regular fa-trash-can"></i></button>
                                    </div> 
                                </td>*/}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className=" row justify-content-center align-items-center mt-3">
                <div className="col-auto">
                    <div className="d-flex justify-content-center align-items-center">
                        <button type="button"
                            className="btn btn-primary d-flex align-items-center"
                            onClick={() => handelPageChange(param?.pageNo - 1)} disabled={param.pageNo <= 1}>
                            Previous
                        </button>
                        <div className="col px-5">
                            <p className="mb-0 fs--1 ">
                                <span className="d-none d-sm-inline-block" data-list-info="data-list-info">{param.pageNo} of {Math.ceil(data?.count / param.limit)} </span>
                                <span className="d-none d-sm-inline-block"></span>
                            </p>
                        </div>
                        <button type="button"
                            className="btn btn-primary d-flex align-items-center"
                            onClick={() => handelPageChange(param?.pageNo + 1)} disabled={param.pageNo * param.limit >= data?.count}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Enquiry;

