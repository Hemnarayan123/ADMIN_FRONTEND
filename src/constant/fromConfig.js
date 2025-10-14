import DEFAULT_IMAGE from "../assets/images/admin/team/avatar.png"
export { DEFAULT_IMAGE };

export const FILE_SIZE = 2 * 1024 * 1024;
export const MAX_INPUT_AMOUNT = 100000000;

export const SUPPORTED_FORMATS_IMAGE = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    'image/png'
];

export const SUPPORTED_FORMATS_DOC = [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'application/pdf',
    'application/vnd.rar'
];

export const BLOGS_STATUS = [
    { id: 1, name: "Able" },
    { id: 2, name: "Disable" },
]

export const ADMIN_STATUS = [
    { id: 1, name: "Able" },
    { id: 2, name: "Disable" },
]

export const ROLE = [
    { id: 1, name: "Super Admin" },
    { id: 2, name: "Admin" },
]

export const PHONE_REG_EXP = /^(?:(?:\+|0{0,2})91(\s*|[-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;


export const ENQUERY_FORM_TYPES = [
    { label: "Brenin", value: 1 },
    // { label: "Join The Team", value: 2 },
    // { label: "Partner With Us", value: 3 },
    // { label: "Recharge Query", value: 4 },
    // { label: "In-Charge Query ", value: 5 },
]

export const CONFIG_GST = 18