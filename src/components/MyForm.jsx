import { useEffect, useState, useRef, useMemo } from 'react'
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { Col, Form, Row } from 'react-bootstrap'
import Select from "react-select";
import JoditEditor from "jodit-react";

const MyForm = ({ errors, fields, initialValues, validSchema, onSubmit, isReset = false, disabled = false }) => {
    const [inactive, setInActive] = useState(false)
    return (
        <Formik initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={validSchema}
            onSubmit={(values, { resetForm }) => {
                if (!disabled) {
                    onSubmit(values)
                    isReset && resetForm()
                    setInActive(true)
                    setTimeout(() => { setInActive(false) }, 2000);
                }
            }}>
            {({ values }) => {
                return (
                    <FormikForm autoComplete="off">
                        <Row>
                            <Col md={12}>
                                {errors && errors?.id && <div className="alert alert-danger py-2 fs--1 mb-0 d-flex" role="alert"><i className="fa-solid fa-exclamation"></i> {errors && errors?.id}<ErrorMessage name='id' /> </div>}
                            </Col>
                            {fields?.map(({ isDisabled = false, ...field }, i) => {
                                return (
                                    <Col md={field?.col ? field?.col : 12} key={i}>
                                        {field?.type === "line" ? <><hr /> <h6 style={{ color: 'rgb(78 83 90)' }} className='fs-1'>{field?.label}</h6> </> :
                                            <Form.Group className="my-2">
                                                {!['submit', 'file', 'hidden'].includes(field?.type) &&
                                                    <Form.Label className="form-label">
                                                        {field?.label}
                                                    </Form.Label>}
                                                {(() => {
                                                    delete field?.hideLabel
                                                    switch (field?.type) {
                                                        // For Select Input
                                                        case 'select':
                                                            var field2 = Object.assign({}, field)
                                                            delete field2.options
                                                            return (
                                                                <Field disabled={disabled || isDisabled} className="form-select" {...field2} name={field?.name} as="select">
                                                                    <option value="0" disabled>Select {field?.label}</option>
                                                                    {
                                                                        field?.options.map((option, i) => (
                                                                            <option value={option?.id} key={option?.id} >{option?.name}</option>
                                                                        ))
                                                                    }
                                                                </Field>
                                                            )

                                                        // For Select Input
                                                        case 'select2':
                                                            return <Field disabled={disabled || isDisabled} {...field} options={field?.options} component={Select2} />

                                                        // For Select Input
                                                        case 'select-multiple':
                                                            return <Field disabled={disabled || isDisabled} isMulti={true} {...field} options={field?.options} component={SelectMultiple} />

                                                        // For Textarea Input
                                                        case 'textarea':
                                                            return <Field disabled={disabled || isDisabled} className="form-control" placeholder={field?.label} as="textarea" {...field} />

                                                        // For Html Editor Input
                                                        case 'text-editer':
                                                            return <Field disabled={disabled || isDisabled} name={field?.name} component={TextEditer} {...field} />

                                                        // For File Input
                                                        case 'file':
                                                            return <Field disabled={disabled || isDisabled} name={field?.name} component={PictureInput} {...field} />

                                                        // For CheckBox Input
                                                        case 'check':
                                                            return <Field disabled={disabled || isDisabled} type="checkbox" name={field?.name} label={field?.name} component={Checkbox} />

                                                        // For Read Only Input 
                                                        case 'readOnly':
                                                            return (
                                                                <div>
                                                                    <Field
                                                                        disabled={disabled || isDisabled}
                                                                        type="text"
                                                                        name={field?.name}
                                                                        value={field?.value}
                                                                        readOnly
                                                                        className="form-control"
                                                                    />
                                                                    <Field
                                                                        type="hidden"
                                                                        name={field?.name}
                                                                        value={field?.hiddenValue}
                                                                    />
                                                                </div>
                                                            )

                                                        // For Submit Input
                                                        case 'submit':
                                                            return <button disabled={disabled || isDisabled || inactive} value="submit" className="btn btn-primary" {...field}>{field?.label}</button>

                                                        // For Rest of Input Filed
                                                        default:
                                                            return <Field disabled={disabled || isDisabled} className="form-control" placeholder={field?.label} {...field} autoComplete="off" />
                                                    }
                                                })()}

                                                {field?.help && <p className="small text-primary">{field?.help}</p>}
                                                <small className='text-danger'>{errors && errors[field?.name]}<ErrorMessage name={field?.name} /></small>
                                            </Form.Group>
                                        }
                                    </Col>
                                )
                            })}
                        </Row>
                    </FormikForm>
                )
            }}
        </Formik >
    )
}

const PictureInput = ({ form, field, multiple, label, disabled }) => {

    var [url, setUrl] = useState('')
    var [urls, setUrls] = useState([])

    useEffect(() => {
        var data = field?.value
        if (data != null && Array.isArray(data)) { setUrls(data) }
        else if (data != null && typeof data != 'object') { setUrl(data) }
    }, [field])

    return (
        <>
            <label className="form-label form-label">
                {label}
                {![undefined, null, ""].includes(url) && <a className="fs--2 ms-1" target="__blank" href={url}> (Download Attachment) </a>}
            </label>
            <div className="input-group">
                <input
                    name={field?.name}
                    className="form-control"
                    type="file"
                    multiple={multiple}
                    disabled={disabled}
                    aria-describedby="btnGroupAddon2"
                    onChange={e => {
                        multiple ? form.setFieldValue(field?.name, e.target.files) : form.setFieldValue(field?.name, e.target.files[0])
                    }} />
                {![undefined, null, ""].includes(url) &&
                    <a className="input-group-text" target="__blank" href={url} id="btnGroupAddon2">
                        <i className="fa fa-download"></i>
                    </a>}

                {urls.length > 0 && <div className="btn-group me-2" role="group">
                    {urls?.map((item, i) => (
                        <a key={i} type="button" className="btn btn-secondary" href={item} target="__blank"><i className="fa fa-download"></i></a>
                    ))}
                </div>}

            </div>
        </>
    )
};

const PictureInputSmall = ({ form, field, multiple, disabled, className = "" }) => {
    var random = Math.random();
    const [selected, setSelected] = useState(false)
    return (
        <>
            <label className={`btn btn-sm btn-falcon-default mb-0 ${selected ? className : ''}`} type="button" htmlFor={`random-${random}`}>
                <i className="fa fa-paperclip" aria-hidden="true"></i>
            </label>
            <input
                name={field?.name}
                id={`random-${random}`}
                className="form-control d-none"
                type="file"
                multiple={multiple}
                disabled={disabled}
                aria-describedby="btnGroupAddon2"
                onChange={e => {
                    setSelected(true)
                    multiple ? form.setFieldValue(field?.name, e.target.files) : form.setFieldValue(field?.name, e.target.files[0])
                }} />
        </>
    )
};

const Checkbox = ({ form, field, disabled, size = 'lg', onChangeCustom = () => null, className = "", checked = false }) => {
    return (
        <div className={`form-check form-switch form-${size}-switch ${className}`}>
            <input checked={checked} disabled={disabled} className="form-check-input" id="Checked" type="checkbox" {...field} onChange={(e) => {
                onChangeCustom(Number(e.target.checked))
                form.setFieldValue(field?.name, Number(e.target.checked))
            }} />
            <label className="form-check-label" htmlFor="Checked"></label>
        </div>
    )
};

const Select2 = ({ form, field, options = [], label = "", menuPortalTarget = null, className = "", classNamePrefix = "react-select", disabled = false, onChange = () => null, onChangeCustom = () => null, onBlur = (val) => null, onChangeUpdateToNull = false }) => {

    const [myValue, setMyValue] = useState(null);
    useEffect(() => {
        if (onChangeUpdateToNull) {
            var selected = options.filter(row => row.id === field?.value)
            selected.length === 1 ? setMyValue(selected?.[0]) : setMyValue(null)
        } else {
            setMyValue(options.find(row => row.id === field?.value))
        }
    }, [field?.value, options, onChangeUpdateToNull])

    return (
        <Select
            closeMenuOnSelect={true}
            options={options}
            isDisabled={disabled}
            menuPortalTarget={menuPortalTarget}
            placeholder={`Select ${label}`}
            // menuIsOpen={false}
            className={className}
            classNamePrefix={classNamePrefix}
            isOptionSelected={(option, selectValue) => selectValue.some(i => i === option)}
            getOptionLabel={(option) => option?.name}
            getOptionValue={(option) => option?.id}
            value={myValue}
            onBlur={() => { onBlur(myValue?.[0]) }}
            onChange={(value) => {
                onChange(value)
                onChangeCustom(value)
                setMyValue(value)
                form.setFieldValue(field?.name, value.id)
            }}
        />
    )
};

const SelectMultiple = ({
    className,
    placeholder,
    field,
    form,
    disabled = false,
    options,
    isMulti = false
}) => {
    const onChange = (option) => {
        form.setFieldValue(
            field?.name,
            isMulti
                ? (option).map((item) => item.id)
                : (option).id
        );
    };

    const getValue = () => {
        if (options) {
            return isMulti
                ? options.filter(option => field?.value.indexOf(option?.id) >= 0)
                : options.find(option => option?.id === field?.value);
        } else {
            return isMulti ? [] : "";
        }
    };

    return (
        <Select
            className={className}
            isDisabled={disabled}
            name={field?.name}
            value={getValue()}
            onChange={onChange}
            placeholder={placeholder}
            options={options}
            getOptionLabel={(option) => option?.name}
            getOptionValue={(option) => option?.id}
            isMulti={isMulti}
        />
    );
};

// const TextEditer = ({ form, field, disabled }) => {
//     const editor = useRef(null)
//     const [canUpdate, setCanUpdate] = useState(true)
//     const [content, setContent] = useState('')

//     useEffect(() => {
//         if (canUpdate && field?.value !== "") {
//             setContent(field?.value)
//             setCanUpdate(false)
//         }

//     }, [field?.value, canUpdate])

//     return useMemo(() => {
//         const config = { readonly: disabled }
//         return <JoditEditor ref={editor} value={content} config={config} onBlur={content => form.setFieldValue(field?.name, content)} />
//     }, [content, form, field?.name, disabled])
// }

const TextEditer = ({ form, field, disabled }) => {
    const editor = useRef(null);
    const [canUpdate, setCanUpdate] = useState(true);
    const [content, setContent] = useState('');

    useEffect(() => {
        if (canUpdate && field?.value !== "") {
            setContent(field?.value);
            setCanUpdate(false);
        }
    }, [field?.value, canUpdate]);

    const handleChange = (newContent) => {
        setContent(newContent);
        form.setFieldValue(field?.name, newContent);
    };

    return (
        <JoditEditor
            ref={editor}
            value={content}
            config={{ readonly: disabled }}
            onChange={handleChange} // 👈 Yeh change event ko capture karega
        />
    );
};



export { PictureInput, PictureInputSmall, Checkbox, Select2, SelectMultiple, TextEditer }
export default MyForm