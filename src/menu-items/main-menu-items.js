import React from 'react';
import {FormattedMessage} from 'react-intl';

import {
    IconAtom,
    IconUserOff,
    IconBasket,
    IconBrandProducthunt,
    IconBellRinging,
    IconBorderAll,
    IconBorderRadius,
    IconBoxMultiple,
    IconBrandChrome,
    IconBrandGravatar,
    IconBrush,
    IconBug,
    IconTruckDelivery,
    IconCalendar,
    IconTransferIn,
    IconChartArcs,
    IconChartCandle,
    IconChartInfographic,
    IconCircle,
    IconCircleOff,
    IconClipboardList,
    IconDashboard,
    IconDeviceAnalytics,
    IconFiles,
    IconForms,
    IconHelp,
    IconId,
    IconKey,
    IconLayoutList,
    IconLoader,
    IconLockAccess,
    IconMail,
    IconMenu,
    IconMessages,
    IconNfc,
    IconPalette,
    IconPencil,
    IconPhoneCall,
    IconPictureInPicture,
    IconReceipt2,
    IconRun,
    IconShadow,
    IconShape,
    IconShieldLock,
    IconSitemap,
    IconTools,
    IconTypography,
    IconUser,
    IconUserCheck
} from '@tabler/icons';

const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconUserOff:IconUserOff,
    IconChartArcs: IconChartArcs,
    IconClipboardList: IconClipboardList,
    IconChartInfographic: IconChartInfographic,
    IconTruckDelivery:IconTruckDelivery,
    IconForms: IconForms,
    IconTransferIn:IconTransferIn,
    IconReceipt2: IconReceipt2,
    IconPencil: IconPencil,
    IconPalette: IconPalette,
    IconShadow: IconShadow,
    IconPhoneCall: IconPhoneCall,
    IconBrandChrome: IconBrandChrome,
    IconFiles: IconFiles,
    IconAtom: IconAtom,
    IconTools: IconTools,
    IconBrush: IconBrush,
    IconLockAccess: IconLockAccess,
    IconShieldLock: IconShieldLock,
    IconKey: IconKey,
    IconTypography: IconTypography,
    IconMenu: IconMenu,
    IconBoxMultiple: IconBoxMultiple,
    IconCircleOff: IconCircleOff,
    IconCircle: IconCircle,
    IconBorderRadius: IconBorderRadius,
    IconBrandGravatar: IconBrandGravatar,
    IconShape: IconShape,
    IconBrandProducthunt:IconBrandProducthunt,
    IconUserCheck: IconUserCheck,
    IconId: IconId,
    IconLayoutList: IconLayoutList,
    IconBug: IconBug,
    IconLoader: IconLoader,
    IconRun: IconRun,
    IconUser: IconUser,
    IconHelp: IconHelp,
    IconSitemap: IconSitemap,
    IconPictureInPicture: IconPictureInPicture,
    IconMail: IconMail,
    IconMessages: IconMessages,
    IconNfc: IconNfc,
    IconCalendar: IconCalendar,
    IconBellRinging: IconBellRinging,
    IconBorderAll: IconBorderAll,
    IconChartCandle: IconChartCandle,
    IconBasket: IconBasket
};

const menuItems = {
    items: [
        {
            id: 'dashboard',
            // title: <FormattedMessage id="dashboard" />,
            type: 'group',
            children: [
                // {
                //     id: 'dash-default',
                //     title: <FormattedMessage id="Dashboard" />,
                //     type: 'item',
                //     url: '/dashboard',
                //     icon: icons['IconMenu'],
                //     breadcrumbs: false
                // },
                {
                    id: 'dash-product-categories',
                    title: <FormattedMessage id="Product Categories" />,
                    type: 'item',
                    url: '/dashboard/products-categories',
                    icon: icons['IconBug'],
                    breadcrumbs: false
                },
                {
                    id: 'dash-products',
                    title: <FormattedMessage id="Products" />,
                    type: 'item',
                    url: '/dashboard/products',
                    icon: icons['IconBrandProducthunt'],
                    breadcrumbs: false
                },
                // {
                //     id: 'dash-transactions',
                //     title: <FormattedMessage id="Transactions" />,
                //     type: 'item',
                //     url: '/dashboard/transactions',
                //     icon: icons['IconTransferIn'],
                //     breadcrumbs: false
                // },
                // {
                //     id: 'dash-delivery',
                //     title: <FormattedMessage id="Delivery Track" />,
                //     type: 'item',
                //     url: '/dashboard/delivery-tracking',
                //     icon: icons['IconTruckDelivery'],
                //     breadcrumbs: false
                // },
                // {
                //     id: 'dash-users',
                //     title: <FormattedMessage id="Customers" />,
                //     type: 'item',
                //     url: '/dashboard/users',
                //     icon: icons['IconPictureInPicture'],
                //     breadcrumbs: false
                // },
                {
                    id: 'dash-vendors',
                    title: <FormattedMessage id="Vendors" />,
                    type: 'item',
                    url: '/dashboard/vendors',
                    icon: icons['IconUserOff'],
                    breadcrumbs: false
                },
                // {
                //     id: 'dash-settings',
                //     title: <FormattedMessage id="Settings" />,
                //     type: 'item',
                //     url: '/dashboard/settings',
                //     icon: icons['IconBrandGravatar'],
                //     breadcrumbs: false
                // }
            ]
        }

        // {
        //     id: 'pages',
        //     title: <FormattedMessage id="pages" />,
        //     caption: <FormattedMessage id="pages-caption" />,
        //     type: 'group',
        //     children: [
        //         {
        //             id: 'authentication',
        //             title: <FormattedMessage id="authentication" />,
        //             type: 'collapse',
        //             icon: icons['IconKey'],
        //             children: [

        //                         {
        //                             id: 'login3',
        //                             title: <FormattedMessage id="login" />,
        //                             type: 'item',
        //                             url: '/pages/login/login3',
        //                             target: true
        //                         },
        //                         {
        //                             id: 'register3',
        //                             title: <FormattedMessage id="register" />,
        //                             type: 'item',
        //                             url: '/pages/register/register3',
        //                             target: true
        //                         }

        //             ]
        //         },

        //     ]
        // },
        // {
        //     id: 'utilities',
        //     title: <FormattedMessage id="utilities" />,
        //     type: 'group',
        //     children: [
        //         {
        //             id: 'util-typography',
        //             title: <FormattedMessage id="typography" />,
        //             type: 'item',
        //             url: '/utils/util-typography',
        //             icon: icons['IconTypography']
        //         },
        //         {
        //             id: 'color',
        //             title: <FormattedMessage id="color" />,
        //             type: 'item',
        //             url: '/utils/util-color',
        //             icon: icons['IconPalette']
        //         },
        //         {
        //             id: 'shadow',
        //             title: <FormattedMessage id="shadow" />,
        //             type: 'item',
        //             url: '/utils/util-shadow',
        //             icon: icons['IconShadow']
        //         },
        //         {
        //             id: 'icons',
        //             title: <FormattedMessage id="icons" />,
        //             type: 'collapse',
        //             icon: icons['IconPencil'],
        //             children: [
        //                 {
        //                     id: 'util-tabler-icons',
        //                     title: <FormattedMessage id="tabler-icons" />,
        //                     type: 'item',
        //                     url: '/icons/tabler-icons'
        //                 },
        //                 {
        //                     id: 'util-material-icons',
        //                     title: <FormattedMessage id="material-icons" />,
        //                     type: 'item',
        //                     url: '/icons/material-icons'
        //                 }
        //             ]
        //         }
        //     ]
        // },
        // {
        //     id: 'sample-docs-roadmap',
        //     type: 'group',
        //     children: [
        //         {
        //             id: 'sample-page',
        //             title: <FormattedMessage id="sample-page" />,
        //             type: 'item',
        //             url: '/sample-page',
        //             icon: icons['IconBrandChrome']
        //         },
        //         {
        //             id: 'documentation',
        //             title: <FormattedMessage id="documentation" />,
        //             type: 'item',
        //             url: '#',
        //             icon: icons['IconHelp'],
        //             target: true,
        //             external: true
        //         }
        //     ]
        // }
    ]
};

export default menuItems;
