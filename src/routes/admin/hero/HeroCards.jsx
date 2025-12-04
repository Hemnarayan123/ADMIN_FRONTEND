import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AxiosHelper from '../../../helper/AxiosHelper';
import Swal from 'sweetalert2'
import { formatDateDDMMYYYY, getDeleteConfig } from '../../../helper/StringHelper';
import Status from '../../../components/Table/Status';
import Action from '../../../components/Table/Action';
import { CloseButton, Modal } from 'react-bootstrap';
import withReactContent from 'sweetalert2-react-content';
import { toast } from 'react-toastify';

const MySwal = withReactContent(Swal)

const HeroCard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ count: 0, record: [], totalPages: 0, pagination: [] });
    const [showView, setShowView] = useState(false);
    const [param, setParam] = useState({ limit: 10, pageNo: 1, query: "", orderBy: 'createdAt', orderDirection: -1 })
    const [initialValues, setInitialValues] = useState({
        team_name: "",
        city_name: "",
        team_image: "", 
    });

    // ********************************* For Getting Data **************************************

    // get Table Data 
    const getDataForTable = useCallback(async () => {
        const { data } = await AxiosHelper.getData("admin/get-herocard", param);
        console.log("Hero Card Data", data);
        
        if (data?.status === true) {
            let { count, totalPages, record, pagination } = data?.data
            setData({ count, totalPages, record, pagination })
        } else {
            toast.error(data?.message);
        }
    }, [param])

    const handelSort = (event) => {
        var orderBy = event.target.attributes.getNamedItem('data-sort').value;
        if (param?.orderBy !== orderBy) {
            setParam({ ...param, orderBy })
        } else {
            setParam({ ...param, orderDirection: param?.orderDirection * -1 })
        }
    }

    const handelPageChange = (pageNo) => { setParam({ ...param, pageNo }) }

    useEffect(() => { getDataForTable() }, [param])


    // For Delete ...............................................................
    const deleteData = async (event) => {
        var { isConfirmed } = await MySwal.fire(getDeleteConfig({}))
        if (isConfirmed) {
            var { _id } = JSON.parse(event.target.attributes.getNamedItem('main-data').value);

            var { data } = await AxiosHelper.deleteData(`admin/delete-herocard/${_id}`);

            if (data?.status === true) {
                getDataForTable()
                toast.success(data?.message);
            } else {
                toast.error(data?.message);
            }
        }
    }

    const viewData = async (event) => {
        var data = JSON.parse(event.target.attributes.getNamedItem('main-data').value);
        setInitialValues(data)
        setShowView(true)
    }

    const dropList = [
        { name: "View", onClick: viewData },
        {
            name: "Edit",
            onClick: (event) => {
                var data = JSON.parse(event.target.attributes.getNamedItem('main-data').value);
                navigate(`/admin/hero_Cards/edit/${data._id}`)
            }
        },
        { name: "Delete", onClick: deleteData, className: "text-danger" },
    ]
    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-3">
                        <div className="card-header">
                            <div className="row flex-between-end">
                                <div className="col-auto align-self-center">
                                    <h5 className="mb-0" data-anchor="data-anchor">Hero Cards</h5>
                                </div>
                                <div className="col-auto ms-auto">
                                    <div className="mt-2" role="tablist">
                                        <Link to={`/admin/dashboard`} className="me-2 btn btn-sm btn-falcon-default">
                                            <i className="fa fa-home me-1"></i>
                                            <span className="d-none d-sm-inline-block ms-1">Dashboard</span>
                                        </Link>
                                        <Link to={`/admin/hero_Cards/add`}>
                                            <button className="btn btn-sm btn-falcon-default">
                                                <i className="fa fa-plus me-1"></i>
                                                Add Hero Cards
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="card-body pt-0">
                            <div className="row  justify-content-between mb-3">
                                <div className="col-md-6 d-flex">
                                    <span className='pe-2'>Show</span>
                                    <select className="w-auto form-select form-select-sm" onChange={(e) => setParam({ ...param, limit: e.target.value })} >
                                        {[10, 20, 50].map((row) => <option key={row} value={row}>{row}</option>)}
                                    </select>
                                    <span className='ps-1'>entries</span>
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
                            </div>

                            <div className="tab-content">
                                <div id="tableExample2" data-list="">
                                    <div className="table-responsive1 ">
                                        <table className="table table-bordered table-striped fs--1 mb-0">

                                            <thead className="bg-200 text-900">
                                                <tr>
                                                    <th onClick={handelSort} className={`sort ${param?.orderBy === "team_name" && (param?.orderDirection === 1 ? 'asc' : 'desc')}`} data-sort="team_name">Team Name</th>
                                                    <th onClick={handelSort} className={`sort ${param?.orderBy === "city_name" && (param?.orderDirection === 1 ? 'asc' : 'desc')}`} data-sort="city_name">City Name</th>
                                                    <th onClick={handelSort} className={`sort ${param?.orderBy === "createdAt" && (param?.orderDirection === 1 ? 'asc' : 'desc')}`} data-sort="createdAt">Created Date</th>
                                                     <th>Image</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="list">
                                                {data?.record && data?.record.map((row, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td className="fw-bold text-primary cursor-pointer" main-data={JSON.stringify(row)} onClick={viewData}>{row.team_name}</td>
                                                             <td>{row.city_name}</td>
                                                             <td>{formatDateDDMMYYYY(row.createdAt)}</td>
                                                            <td>
                                                                {row.team_image ? (
                                                                    <img
                                                                        src={row.team_image}
                                                                        alt={row.team_name}
                                                                        width={60}
                                                                        height={40}
                                                                        
                                                                    />
                                                                ) : (
                                                                    <span>No Image</span>
                                                                )}
                                                            </td>

                                                            <td><Action dropList={dropList} data={row} /></td>
                                                        </tr>
                                                    )
                                                })}
                                                {data?.record.length === 0 && <tr><td colSpan="100" className='text-danger text-center'>No data available..</td></tr>}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="row align-items-center mt-3">
                                    <div className="col">
                                        <p className="mb-0 fs--1">
                                            <span className="d-none d-sm-inline-block" data-list-info="data-list-info">{(param.pageNo - 1) * param.limit + 1} to {param.pageNo * param.limit > data?.count ? data?.count : param.pageNo * param.limit} of {data?.count}</span>
                                            <span className="d-none d-sm-inline-block"> </span>
                                        </p>
                                    </div>
                                    <div className="col-auto">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <button type="button" dd="disabled" className=" btn btn-falcon-default btn-sm" onClick={() => handelPageChange(1)}>
                                                <span className="fas fa-chevron-left" />
                                            </button>
                                            <ul className="pagination mb-0 mx-1">
                                                {data?.pagination.map((row, i) => {
                                                    return (
                                                        <li key={row}>
                                                            <button onClick={() => handelPageChange(row)} type="button" className={`page me-1 btn btn-sm ${row === data?.pageNo ? "btn-primary" : "btn-falcon-default"}`}>
                                                                {row}
                                                            </button>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                            <button type="button" className="btn btn-falcon-default btn-sm" onClick={() => handelPageChange(data?.totalPages)}>
                                                <span className="fas fa-chevron-right"> </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Modal
                size="lg"
                show={showView}
                centered={true}
                onHide={() => setShowView(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        View Coupon
                    </Modal.Title>
                    <CloseButton onClick={() => setShowView(false)} />
                </Modal.Header>
                <Modal.Body>

                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <label className='fs--1 m-0'>Team Name</label>
                            <span className="fs--1">{initialValues?.team_name}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <label className='fs--1 m-0'>Team City</label>
                            <span className="fs--1 ps-5 text-center">{initialValues?.city_name}</span>
                        </li>

                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <label className='fs--1 m-0'>Team Image</label>
                            <span className="fs--1 ps-5 text-center"><img src={initialValues?.team_image} alt={initialValues?.team_name} width={60} height={40} /></span>
                        </li>

                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <label className='fs--1 m-0'>Hero Card Created Date</label>
                            <span className="fs--1">{formatDateDDMMYYYY(initialValues?.createdAt)}</span>
                        </li>

                    </ul>
                </Modal.Body>
            </Modal>
        </div >
    )
}

export default HeroCard
