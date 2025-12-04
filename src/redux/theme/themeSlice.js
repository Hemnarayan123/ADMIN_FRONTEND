import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    settings: {
        favicon: "",
        logo: "",
        footer_logo: "",
        application_name: "",
        copyright: "",
        meta_title: "",
        meta_keyword: "",
        meta_description: "",
        address: "",
        corporate_address: "",
        email: "",
        phone: "",
        whatsapp_mobile: "",
        slogan: "",
        facebook_link: "",
        twitter_link: "",
        youtube_link: "",
        linkedin_link: "",
        instagram_link: ""
    }
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        updateSettings: (state, action) => { state.settings = action.payload },
    },
})

// Action creators are generated for each case reducer function
export const { updateSettings } = themeSlice.actions

export default themeSlice.reducer