import {
  AuthBindings,
  Authenticated,
  Refine,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import VillaOutlined from "@mui/icons-material/VillaOutlined";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import axios, { AxiosRequestConfig } from "axios";
import { CredentialResponse } from "interfaces/google";

import { Login } from "pages/login";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { parseJwt } from "utils/parse-jwt";
// import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { Agents, AllProperties, Home, Messages, MyProfile, Reviews } from "pages";
import { AccountCircleOutlined, ChatBubbleOutline, Dashboard, PeopleAltOutlined, StarOutlineRounded } from "@mui/icons-material";
import { Header, Layout, Sider, Title } from "components/layout";
import { logo, yariga } from "assets";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const { t, i18n } = useTranslation();

  const authProvider: AuthBindings = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      if (profileObj) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...profileObj,
            avatar: profileObj.picture,
          })
        );

        localStorage.setItem("token", `${credential}`);

        return {
          success: true,
          redirectTo: "/dashboard",
        };
      }

      return {
        success: false,
      };
    },
    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                notificationProvider={notificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                i18nProvider={i18nProvider}
                resources={[
                  {
                    name: "dashboard",
                    list: "/dashboard",
                    icon: <Dashboard />
                  },
                  {
                    name: "properties",
                    list: "/properties",
                    // show: AllProperties,
                    // create: CreateProperty,
                    // edit: EditProperty,
                    icon: <VillaOutlined />,
                  },
                  {
                    name: "agents",
                    list: '/agents',
                    // show: AgentProfile,
                    icon: <PeopleAltOutlined />,
                  },
                  {
                      name: "reviews",
                      list: '/reviews',
                      icon: <StarOutlineRounded />,
                  },
                  {
                      name: "messages",
                      list: '/messages',
                      icon: <ChatBubbleOutline />,
                  },
                  {
                      name: "my-profile",
                      options: { label: "My Profile " },
                      list: '/my-profile',
                      icon: <AccountCircleOutlined />,
                  }
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "WEBe3x-MABp6K-IntkWF",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          // Header={() => <ThemedHeaderV2 isSticky={true} />}
                          // Title={() => <ThemedTitleV2 icon={logo} />}
                          // Title={Title}
                          
                Sider={Sider}
                    // Layout={Layout}
                    // Header={Header}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="blog_posts" />}
                    />
                    {/* <Route path="/blog-posts">
                      <Route index element={<BlogPostList />} />
                      <Route path="create" element={<BlogPostCreate />} />
                      <Route path="edit/:id" element={<BlogPostEdit />} />
                      <Route path="show/:id" element={<BlogPostShow />} />
                    </Route> */}
                    {/* <Route path="/categories">
                      <Route index element={<CategoryList />} />
                      <Route path="create" element={<CategoryCreate />} />
                      <Route path="edit/:id" element={<CategoryEdit />} />
                      <Route path="show/:id" element={<CategoryShow />} />
                    </Route> */}
                    <Route path="/dashboard">
                      <Route index element={<Home />} />
                    </Route>
                    <Route path="/properties">
                      <Route index element={<AllProperties />} />
                    </Route>
                    <Route path="/agents">
                      <Route index element={<Agents />} />
                    </Route>
                    <Route path="/reviews">
                      <Route index element={<Reviews />} />
                    </Route>
                    <Route path="/messages">
                      <Route index element={<Messages />} />
                    </Route>
                    <Route path="/my-profile">
                      <Route index element={<MyProfile />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              {/* <DevtoolsPanel /> */}
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
