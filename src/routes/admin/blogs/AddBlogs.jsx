import React, { useState } from 'react'
import MyForm from '../../../components/MyForm'
import * as Yup from "yup";
import { toast } from 'react-toastify';
import AxiosHelper from '../../../helper/AxiosHelper';
import { BLOGS_STATUS, FILE_SIZE, SUPPORTED_FORMATS_IMAGE } from '../../../constant/fromConfig';
import { Link, useNavigate } from 'react-router-dom';


const AddBlogs = () => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({ name: '', status: '' })

    const initialValues = {
        title: "",
        slug: "",
        author: "",
        tags: "",
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
        short_description: "",
        html_description: "",
        image: "",
        status: "",
        isFeatured: false,
        sort_order: Number,
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required').min(2, 'Title must be at least 2 characters').max(100, 'Title must be less than 100 characters'),
        slug: Yup.string().required('Slug is required').min(2, 'Slug must be at least 2 characters').max(100, 'Slug must be less than 100 characters'),
        author: Yup.string().required('Author is required').min(2, 'Author must be at least 2 characters').max(400, 'Author must be less than 100 characters'),
        tags: Yup.string().required('Tags is required').min(2, 'Tags must be at least 2 characters').max(400, 'Tags must be less than 100 characters'),
        meta_title: Yup.string().required('Meta Title is required').min(2, 'Meta Title must be at least 2 characters').max(100, 'Meta Title must be less than 100 characters'),
        meta_description: Yup.string().required('Meta Description is required').min(10, 'Meta Description must be at least 10 characters').max(400, 'Meta Description must be less than 400 characters'),
        meta_keywords: Yup.string().required('Meta Keywords is required').min(2, 'Meta Keywords must be at least 2 characters').max(100, 'Meta Keywords must be less than 50 characters'),
        short_description: Yup.string().required('Short Description is required').min(10, 'Short Description must be at least 10 characters').max(400, 'Short Description must be less than 400 characters'),
        html_description: Yup.string().required('Html Description is required').min(10, 'Html Description must be at least 10 characters'),
        image: Yup.mixed()
            .test("fileSize", "File too large", (value) => {
                if (value && (typeof value) !== 'string') return value.size <= FILE_SIZE;
                return true;
            })
            .test("fileFormat", "Unsupported Format.", (value) => {
                if (value && (typeof value) !== 'string') return SUPPORTED_FORMATS_IMAGE.includes(value.type);
                return true;
            }),
        status: Yup.number().required('Status is required'),
        isFeatured: Yup.boolean(),  
    });

    const fields = [
        {
            label: "Title",
            name: "title",
            type: "text",
            col: 6
        },
        {
            label: "Slug",
            name: "slug",
            type: "text",
            col: 6
        },
        {
            label: "Author",
            name: "author",
            type: "text",
            col: 6
        },
        {
            label: "Tags",
            name: "tags",
            type: "text",
            col: 6
        },
        {
            label: "Meta Title",
            name: "meta_title",
            type: "text",
            col: 6
        },

        {
            label: "Meta Description",
            name: "meta_description",
            type: "textarea",
            col: 6
        },

        {
            label: "Meta Keywords",
            name: "meta_keywords",
            type: "text",
            col: 6
        },
        {
            label: "Short Description",
            name: "short_description",
            type: "textarea",
            col: 6
        },
        // {
        //     label: "Html Description",
        //     name: "html_description",
        //     type: "textarea",
        //     col: 6
        // },
        {
            label: "Status",
            name: "status",
            type: "select2",
            options: BLOGS_STATUS,
            col: 6
        },
        {
            label: "Image",
            name: "image",
            type: "file",
            col: 6,
           help: 'Image size must be 1200 x 628 px'
        },

        {
            label: "Blog Sort Order",
            name: "sort_order",
            type: Number, 
            col: 6,
        },

        {
            label: "Is Featured?",
            name: "isFeatured",
            type: "check", 
            col: 6,
        },

        {
            label: "Details :",
            type: "line",
        },
        {
            label: 'Details',
            name: 'html_description',
            type: 'text-editer',
            col: 12
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
                                    <h5 className="mb-0" data-anchor="data-anchor">Add Blogs</h5>
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
                            <MyForm errors={errors} fields={fields} initialValues={initialValues} validSchema={validationSchema} onSubmit={async (values) => {
                                var data = "";
                                data = await AxiosHelper.postData("admin/create-blogs", values, true);
                                if (data?.data?.status === true) {
                                    toast.success(data?.data?.message);
                                    navigate('/admin/blogs')
                                } else {
                                    setErrors(data?.data?.data)
                                    toast.error(data?.data?.message);
                                }
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddBlogs
