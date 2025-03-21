
import SignInForm from "../../pages/SignInForm"
import Dashboard from "../../pages/Dashboard"
import Profile from "../../pages/Profile"

export const nav = [
     { path:     "/",           name: "Home",       element: <SignInForm />,     isMenu: true,     isPrivate: false },
     { path:     "/login",      name: "Login",      element: <SignInForm />,     isMenu: false,    isPrivate: false },
     { path:     "/dashboard",       name: "dash",       element: <Dashboard />,      isMenu: true,     isPrivate: true  },
     { path:     "/profile",    name: "Account",    element: <Profile />,        isMenu: true,     isPrivate: true  },
]