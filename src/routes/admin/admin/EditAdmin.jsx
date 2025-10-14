import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MyForm from '../../../components/MyForm';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import AxiosHelper from '../../../helper/AxiosHelper';
import { ADMIN_STATUS, ROLE} from '../../../constant/fromConfig';


const EditAdmin = () => {
    const {slug} = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({ name: '', status: '' });
    const initialValues = {
        name: '',
        email: '',
        mobile: '',
        password: '',
        status: '',
        role: ''
    };


    const validationSchema = Yup.object().shape({
        name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Admin Name Required.'),
        email: Yup.string().max(50, 'Too Long!').email().required('Email is Required.'),
        mobile: Yup.string().min(10, 'Number must be 10 digits').max(10, 'Please Enter Valied Number ').required('Check the Required.'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters.')
            .max(50, 'Password cannot exceed 50 characters.')
            .required('Password is required.'),

        status: Yup.number().required('Status is required'),
        role: Yup.string().typeError("Please select Role.").required('Please Select Role.'),
    });

    const fields = [
        {
            label: 'Name',
            name: 'name',
            type: 'text',
            col: 6,
            placeholder: 'Enter admin name',
        },
        {
            label: 'Email',
            name: 'email',
            type: 'email',
            col: 6,
            placeholder: 'Enter email address',
        },
        {
            label: 'Phone',
            name: 'mobile',
            type: 'text',
            col: 6,
            placeholder: 'Enter 10-digit phone number',
        },
        {
            label: 'Password',
            name: 'password',
            type: 'text',
            col: 6,
            placeholder: 'Enter password',
        },
        {
            label: 'Status',
            name: 'status',
            type: 'select2',
            options: ADMIN_STATUS,
            col: 6,
            placeholder: 'Select status',
        },
        {
            label: 'Role',
            name: 'role',
            type: 'select2',
            options: ROLE,
            col: 6,
            placeholder: 'Select role',
        },
        {
            label: 'Submit',
            name: 'submit',
            type: 'submit',
        },
    ];

    const fetchBlogsData = useCallback(async () => {
        try {
            const { data } = await AxiosHelper.getData(`admin/get-blogs-slug/${slug}`);
            if (data?.status === true) {
                setInitialValues(data?.data);
            } else {
                toast.error(data?.message);
                navigate('/admin/blogs');
            }
        } catch (error) {
            console.error("Error fetching blogs data:", error);
        }
    }, [slug, navigate]);

    useEffect(() => {
        fetchBlogsData();
    }, [fetchBlogsData]);

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-3">
                        <div className="card-header">
                            <div className="row flex-between-end">
                                <div className="col-auto align-self-center">
                                    <h5 className="mb-0" data-anchor="data-anchor">Edit Blogs</h5>
                                </div>
                                <div className="col-auto ms-auto">
                                    <Link to={`/admin/blogs`}>
                                        <button className="btn btn-sm btn-falcon-default">
                                            <i className="fa fa-arrow-left me-2"></i>
                                            Go Back
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='card-body'>
                            <MyForm
                                errors={errors}
                                fields={fields}
                                initialValues={initialValues}
                                validSchema={validationSchema}
                                onSubmit={async (values) => {
                                    const data = await AxiosHelper.putData(`admin/update-admin/${values.id}`, values);

                                    if (data?.data?.status === true) {
                                        toast.success(data?.data?.message);
                                        navigate('/admin/admins');
                                    } else {
                                        setErrors(data?.data?.data);
                                        toast.error(data?.data?.message);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditAdmin;
