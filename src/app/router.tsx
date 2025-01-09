import {Route, Routes} from "react-router";
import {Profile, LoginPage, NotFoundPage} from "@/pages";
import {Contacts, Favorites, PersonalData} from "@/features";

export const PATH = {
    LOGIN_PAGE: "login",
    NOT_FOUND_PAGE: "/*",
    PROFILE: {
        PROFILE_PAGE: "/my-profile",
        PROFILE_PAGE_PERSONAL_DATA: "/my-profile/personal-data",
        PROFILE_PAGE_FAVORITES: "/my-profile/favorites",
        PROFILE_PAGE_CONTACTS: "/my-profile/contacts"
    }

} as const

export const Routing = () => {
    return (
        <Routes>
            <Route path={PATH.LOGIN_PAGE} element={<LoginPage/>}/>
            <Route path={PATH.PROFILE.PROFILE_PAGE} element={<Profile/>}>
                <Route path={PATH.PROFILE.PROFILE_PAGE_PERSONAL_DATA} element={<PersonalData/>}/>
                <Route path={PATH.PROFILE.PROFILE_PAGE_FAVORITES} element={<Favorites/>}/>
                <Route path={PATH.PROFILE.PROFILE_PAGE_CONTACTS} element={<Contacts/>}/>
            </Route>
            <Route path={PATH.NOT_FOUND_PAGE} element={<NotFoundPage/>}/>
        </Routes>
    )
}