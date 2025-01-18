import {Route, Routes} from "react-router";
import {Helps, LoginPage, NotFoundPage, Profile, Request} from "@/pages";
import {Contacts, Favorites, PersonalData, ProtectedRoute} from "@/features";

export const PATH = {
    LOGIN_PAGE: "/login",
    NOT_FOUND_PAGE: "/*",
    PROFILE: {
        PROFILE_PAGE: "/profile",
        PROFILE_PAGE_PERSONAL_DATA: "/profile/data",
        PROFILE_PAGE_FAVORITES: "/profile/favorites",
        PROFILE_PAGE_CONTACTS: "/profile/contacts"
    },
    HELPS_PAGE: "/helps",
    REQUEST_HELP: "/request/:id",
} as const

export const Routing = () => {
    return (
        <Routes>
            <Route path={PATH.LOGIN_PAGE} element={<LoginPage/>}/>
            <Route element={<ProtectedRoute/>}>
                <Route path={PATH.PROFILE.PROFILE_PAGE} element={<Profile/>}>
                    <Route path={PATH.PROFILE.PROFILE_PAGE_PERSONAL_DATA} element={<PersonalData/>}/>
                    <Route path={PATH.PROFILE.PROFILE_PAGE_FAVORITES} element={<Favorites/>}/>
                    <Route path={PATH.PROFILE.PROFILE_PAGE_CONTACTS} element={<Contacts/>}/>
                </Route>
                <Route path={PATH.HELPS_PAGE} element={<Helps/>}/>
                <Route path={PATH.REQUEST_HELP} element={<Request/>}/>
            </Route>
            <Route path={PATH.NOT_FOUND_PAGE} element={<NotFoundPage/>}/>
        </Routes>
    )
}