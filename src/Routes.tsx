import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { UserProvider } from "./UserProvider"
import { Home } from './Home'
import { Layout } from "./Layout";
import { Login } from "./Login";
import { Dashboard } from "./Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    )
  },
  {
    path: "/dashboard",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    )
  },
]);

export const Routes = () => {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>

  )
}