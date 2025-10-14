import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MyForm from '../../../components/MyForm';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import AxiosHelper from '../../../helper/AxiosHelper';
import { FILE_SIZE, BLOGS_STATUS, SUPPORTED_FORMATS_IMAGE } from '../../../constant/fromConfig';


const EditFeatureKits = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({
        product_name: "",
        product_status: "",
        product_image: "",
    });

    const [errors, setErrors] = useState({ name: '', status: '' });

    const fetchBlogsData = useCallback(async () => {
        try {
            const { data } = await AxiosHelper.getData(`admin/get-featurekit-details/${id}`);
            if (data?.status === true) {
                setInitialValues(data?.data);
            } else {
                toast.error(data?.message);
                navigate('/admin/featureKits');
            }
        } catch (error) {
            console.error("Error fetching blogs data:", error);
        }
    }, [id, navigate]);

    useEffect(() => { fetchBlogsData()}, [id, fetchBlogsData]);


    const validationSchema = Yup.object().shape({
        product_name: Yup.string().required('product_name is required').min(2, 'product_name must be at least 2 characters').max(100, 'product_name must be less than 100 characters'),
        product_status: Yup.string().required('product_status is required').min(2, 'product_status must be at least 2 characters').max(100, 'product_status must be less than 100 characters'),
        product_image: Yup.mixed()
            .test("fileSize", "File too large", (value) => {
                if (value && (typeof value) !== 'string') return value.size <= FILE_SIZE;
                return true;
            })
            .test("fileFormat", "Unsupported Format.", (value) => {
                if (value && (typeof value) !== 'string') return SUPPORTED_FORMATS_IMAGE.includes(value.type);
                return true;
            }),
    });

    const fields = [
        {
            label: "Product Name",
            name: "product_name",
            type: "text",
            col: 6
        },
        {
            label: "Product Status",
            name: "product_status",
            type: "text",
            col: 6
        },      

        {
            label: "Product Image",
            name: "product_image",
            type: "file",
            col: 6,
           help: 'Image size must be 1200 x 628 px'
        },
        {
            label: "Submit",
            name: "submit",
            type: "submit",
        }

    ];

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-3">
                        <div className="card-header">
                            <div className="row flex-between-end">
                                <div className="col-auto align-self-center">
                                    <h5 className="mb-0" data-anchor="data-anchor">Edit Feature Kits</h5>
                                </div>
                                <div className="col-auto ms-auto">
                                    <Link to={`/admin/featureKits`}>
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
                                    const data = await AxiosHelper.putData(`admin/update-featurekits/${values._id}`, values, true);

                                    if (data?.data?.status === true) {
                                        toast.success(data?.data?.message);
                                        navigate('/admin/featureKits');
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

export default EditFeatureKits;
