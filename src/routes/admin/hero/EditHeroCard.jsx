import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MyForm from '../../../components/MyForm';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import AxiosHelper from '../../../helper/AxiosHelper';
import { FILE_SIZE, BLOGS_STATUS, SUPPORTED_FORMATS_IMAGE } from '../../../constant/fromConfig';


const EditBlogs = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({
        team_name: "",
        city_name: "",
        team_image: "",
    });

    const [errors, setErrors] = useState({ name: '', status: '' });

    const fetchBlogsData = useCallback(async () => {
        try {
            const { data } = await AxiosHelper.getData(`admin/get-herocard-details/${id}`);
            if (data?.status === true) {
                setInitialValues(data?.data);
            } else {
                toast.error(data?.message);
                navigate('/admin/hero_Cards');
            }
        } catch (error) {
            console.error("Error fetching blogs data:", error);
        }
    }, [id, navigate]);

    useEffect(() => { fetchBlogsData()}, [id, fetchBlogsData]);


    const validationSchema = Yup.object().shape({
        team_name: Yup.string().required('team_name is required').min(2, 'team_name must be at least 2 characters').max(100, 'team_name must be less than 100 characters'),
        city_name: Yup.string().required('city_name is required').min(2, 'city_name must be at least 2 characters').max(100, 'city_name must be less than 100 characters'),
        team_image: Yup.mixed()
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
            label: "Team Name",
            name: "team_name",
            type: "text",
            col: 6
        },
        {
            label: "City Name",
            name: "city_name",
            type: "text",
            col: 6
        },      

        {
            label: "Image",
            name: "team_image",
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
                                    <h5 className="mb-0" data-anchor="data-anchor">Edit Hero Card</h5>
                                </div>
                                <div className="col-auto ms-auto">
                                    <Link to={`/admin/hero_Cards`}>
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
                                    const data = await AxiosHelper.putData(`admin/update-herocard/${values._id}`, values, true);

                                    if (data?.data?.status === true) {
                                        toast.success(data?.data?.message);
                                        navigate('/admin/hero_Cards');
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

export default EditBlogs;
