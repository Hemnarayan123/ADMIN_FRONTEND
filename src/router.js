import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

const routes = [
    {
        path: "/",
        element: React.createElement(Navigate, { to: "/admin", replace: true })
    },
    {
        path: "/admin",
        lazy: async () => {
            let module = await import("./layouts/AdminLayout");
            return { Component: module.default };
        },
        children: [
            {
                index: true,
                lazy: async () => {
                    let module = await import("./routes/admin/Dashboard");
                    return { Component: module.default };
                },
            },
            {
                path: "dashboard",
                lazy: async () => {
                    let module = await import("./routes/admin/Dashboard");
                    return { Component: module.default };
                },
            },
            {
                path: "profile",
                lazy: async () => {
                    let module = await import("./routes/admin/auth/Profile");
                    return { Component: module.default };
                },
            },
            {
                path: "blogs",
                lazy: async () => {
                    let module = await import("./routes/admin/blogs/Blogs");
                    return { Component: module.default };
                },
            },
            {
                path: "hero_Cards",
                lazy: async () => {
                    let module = await import("./routes/admin/hero/HeroCards");
                    return { Component: module.default };
                },
            },

            {
                path: "featureKits",
                lazy: async () => {
                    let module = await import("./routes/admin/featureKits/FeatureKits");
                    return { Component: module.default };
                },
            },

            
            {
                path: "blogs/add",
                lazy: async () => {
                    let module = await import("./routes/admin/blogs/AddBlogs");
                    return { Component: module.default };
                },
            },
            {
                path: "hero_Cards/add",
                lazy: async () => {
                    let module = await import("./routes/admin/hero/AddHero");
                    return { Component: module.default };
                },
            },

            {
                path: "featureKits/add",
                lazy: async () => {
                    let module = await import("./routes/admin/featureKits/AddFeatureKits");
                    return { Component: module.default };
                },
            },
            
            {
                path: "blogs/edit/:slug",
                lazy: async () => {
                    let module = await import("./routes/admin/blogs/EditBlogs");
                    return { Component: module.default };
                },
            },

             {
                path: "hero_Cards/edit/:id",
                lazy: async () => {
                    let module = await import("./routes/admin/hero/EditHeroCard");
                    return { Component: module.default };
                },
            },

            {
                path: "featureKits/edit/:id",
                lazy: async () => {
                    let module = await import("./routes/admin/featureKits/EditFeatureKits.jsx");
                    return { Component: module.default };
                },
            },
            
            {
                path: "enquiry",
                lazy: async () => {
                    let module = await import("./routes/admin/Enquiry");
                    return { Component: module.default };
                },
            },

            {
                path: "user_enquries",
                lazy: async () => {
                    let module = await import("./routes/admin/UserEnquery");
                    return { Component: module.default };
                },
            },
            
            {
                path: "general-settings/:type",
                lazy: async () => {
                    let module = await import("./routes/admin/GeneralSettings");
                    return { Component: module.default };
                },
            },
            {
                path: "logout",
                lazy: async () => {
                    let module = await import("./routes/admin/auth/Logout");
                    return { Component: module.default };
                },
            },

            {
                path: "admin/add",
                lazy: async () => {
                    let module = await import("./routes/admin/admin/AddAdmin");
                    return { Component: module.default };
                },
            },
            {
                path: "admins",
                lazy: async () => {
                    let module = await import("./routes/admin/admin/Admin");
                    return { Component: module.default };
                },
            },
            {
                path: "demo_request",
                lazy: async () => {
                    let module = await import("./routes/admin/RequestDemo");
                    return { Component: module.default };
                },
            },
            {
                path: "admin/edit/:id",
                lazy: async () => {
                    let module = await import("./routes/admin/admin/EditAdmin");
                    return { Component: module.default };
                },
            },


        ],
    },
    {
        path: "/admin",
        lazy: async () => {
            let module = await import("./layouts/AdminAuthLayout");
            return { Component: module.default };
        },
        children: [
            {
                path: 'login',
                lazy: async () => {
                    let module = await import("./routes/admin/auth/Login");
                    return { Component: module.default };
                },
            },
            {
                path: 'forgot-password',
                lazy: async () => {
                    let module = await import("./routes/admin/auth/ForgetPassword");
                    return { Component: module.default };
                },
            },
            {
                path: 'reset-password/:token',
                lazy: async () => {
                    let module = await import("./routes/admin/auth/ResetPassword");
                    return { Component: module.default };
                },
            },
            {
                path: "*",
                lazy: async () => {
                    let module = await import("./routes/admin/errors/NotFoundPage");
                    return { Component: module.default };
                },
            },
        ]
    }
];

const routerConfig = {
    basename: import.meta.env.BASE_URL
};

export default createBrowserRouter(routes, routerConfig);