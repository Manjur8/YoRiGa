import React from "react";
import { useRouterContext, useLink, useRouterType } from "@refinedev/core";

import MuiLink from "@mui/material/Link";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";

import { RefineLayoutThemedTitleProps } from "@refinedev/mui";
import { logo, yariga } from "assets";

const defaultText = "Yariga";

// const defaultIcon = <img src={logo} alt={'logo'} />;
const defaultIcon = (<svg width="39" height="35" viewBox="0 0 39 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M29.8398 16.1745C30.0314 16.5078 30.1322 16.8855 30.1322 17.27C30.1322 17.6545 30.0314 18.0322 29.8398 18.3655L25.531 25.7989C25.3385 26.1308 25.0622 26.4063 24.7298 26.5979C24.3975 26.7894 24.0206 26.8904 23.637 26.8906L15.0656 26.8906C14.6846 26.8877 14.3109 26.7855 13.9815 26.594C13.652 26.4026 13.3782 26.1285 13.187 25.7989L8.87818 18.3655C8.68663 18.0322 8.58582 17.6545 8.58582 17.27C8.58582 16.8855 8.68663 16.5078 8.87818 16.1745L11.2583 12.0701L16.5546 21.1275C16.6418 21.2825 16.7691 21.4113 16.9232 21.5002C17.0772 21.5891 17.2524 21.6349 17.4302 21.6328L21.2877 21.6328C21.4656 21.6349 21.6408 21.5891 21.7948 21.5002C21.9489 21.4113 22.0762 21.2825 22.1634 21.1275L24.0921 17.7599C24.1795 17.6086 24.2255 17.437 24.2255 17.2623C24.2255 17.0876 24.1795 16.916 24.0921 16.7647L15.3973 1.72045C15.0956 1.19867 14.662 0.765398 14.14 0.464105C13.618 0.162813 13.0259 0.00408893 12.4232 0.00385911L11.644 0.00385914C10.9544 0.00359764 10.2769 0.184924 9.6797 0.529597C9.08244 0.87427 8.58648 1.37014 8.24169 1.96733L0.526706 15.3104C0.181668 15.9072 -7.84862e-07 16.5845 -7.54727e-07 17.2739C-7.24593e-07 17.9633 0.181668 18.6405 0.526706 19.2373L8.2417 32.5804C8.58697 33.1769 9.08314 33.672 9.68036 34.0159C10.2776 34.3599 10.9548 34.5407 11.644 34.54L27.074 34.54C27.7636 34.5403 28.441 34.3589 29.0383 34.0143C29.6355 33.6696 30.1315 33.1737 30.4763 32.5765L38.1913 19.2335C38.5363 18.6366 38.718 17.9594 38.718 17.27C38.718 16.5806 38.5363 15.9034 38.1913 15.3065L30.4763 1.96347C30.1315 1.36628 29.6355 0.870411 29.0383 0.525738C28.441 0.181065 27.7636 -0.00025847 27.074 3.09408e-06L20.5162 3.38073e-06L29.8398 16.1745Z" fill="#475BE8"/>
</svg>);

export const ThemedTitleV2: React.FC<RefineLayoutThemedTitleProps> = ({
    collapsed,
    wrapperStyles,
    icon = defaultIcon,
    text = defaultText,
}) => {
    const routerType = useRouterType();
    const Link = useLink();
    const { Link: LegacyLink } = useRouterContext();

    const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

    return (
        <MuiLink
            to="/"
            component={ActiveLink}
            underline="none"
            sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                ...wrapperStyles,
            }}
        >
            <SvgIcon height="24px" width="24px" color="primary">
                {icon}
            </SvgIcon>
            {!collapsed && (
                <Typography
                    variant="h6"
                    fontWeight={700}
                    color="text.primary"
                    fontSize="inherit"
                    textOverflow="ellipsis"
                    overflow="hidden"
                >
                    {text}
                </Typography>
            )}
        </MuiLink>
    );
};