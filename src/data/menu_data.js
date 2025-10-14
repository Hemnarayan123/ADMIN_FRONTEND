export default [
    {
        name: "Dashboard",
        icon: "fa-solid fa-gauge-high",
        url: `/admin/dashboard`
    },
    // {
    //     name: "Blogs",
    //     icon: "fa-solid fa-newspaper",
    //     url: `/admin/blogs`
    // },

    {
        name: "Hero Cards",
        icon: "fa-brands fa-slideshare",
        url: `/admin/hero_Cards`
    },

    {
        name: "FeatureKits",
        icon: "fa-solid fa-cart-flatbed-suitcase",
        url: `/admin/featureKits`
    },

    // {
    //     name: "Enquiry",
    //     icon: "fa-solid fa-address-card",
    //     url: `/admin/enquiry`
    // },

    {
        name: "User Enquiry",
        icon: "fa-solid fa-address-card",
        url: `/admin/user_enquries`
    },

    {
        name: "Admin",
        icon: "fa-regular fa-user",
        url: `/admin/admins`
    },
    // {
    //     name: "Demo Request",
    //     icon: "fa-solid fa-address-card",
    //     url: `/admin/demo_request`
    // },

    {
        name: "Site Setting",
        icon: "fa-solid fa-gear fa-spin",
        children: [
            {
                name: "General Setting",
                url: `/admin/general-settings/1`,
            },
            {
                name: "Email Setting",
                url: `/admin/general-settings/2`,
            },
            {
                name: "Social Links Setting",
                url: `/admin/general-settings/3`,
            },
        ]
    },
]
