import {Route, Routes} from "react-router";
import {Help, LoginPage, NotFoundPage, Profile} from "@/pages";
import {Contacts, Favorites, PersonalData} from "@/features";

export const PATH = {
    LOGIN_PAGE: "login",
    NOT_FOUND_PAGE: "/*",
    PROFILE: {
        PROFILE_PAGE: "/profile",
        PROFILE_PAGE_PERSONAL_DATA: "/profile/user",
        PROFILE_PAGE_FAVORITES: "/profile/favorites",
        PROFILE_PAGE_CONTACTS: "/profile/contacts"
    },
    HELP: "/help"

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
            <Route path={PATH.HELP} element={<Help/>}/>
            <Route path={PATH.NOT_FOUND_PAGE} element={<NotFoundPage/>}/>
        </Routes>
    )
}