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
    IconUserCheck,
    IconCreditCard
} from '@tabler/icons';

const icons = {
    IconDashboard: IconDashboard,
    IconCreditCard,
    IconDeviceAnalytics,
    IconUserOff: IconUserOff,
    IconChartArcs: IconChartArcs,
    IconClipboardList: IconClipboardList,
    IconChartInfographic: IconChartInfographic,
    IconTruckDelivery: IconTruckDelivery,
    IconForms: IconForms,
    IconTransferIn: IconTransferIn,
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
    IconBrandProducthunt: IconBrandProducthunt,
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
            // title: <FormattedMessage id="pages" />,
            // caption: <FormattedMessage id="pages-caption" />,
            type: 'group',
            children: [
                {
                    id: 'Assets',
                    title: <FormattedMessage id="Assets" />,
                    type: 'collapse',
                    icon: icons['IconCreditCard'],
                    children: [
                        {
                            id: 'dash-vendors',
                            title: <FormattedMessage id="Overview" />,
                            type: 'item',
                            url: '/dashboard/overview',
                            icon: '',
                            breadcrumbs: false
                        },
                        {
                            id: 'assets',
                            title: <FormattedMessage id="Assets List" />,
                            type: 'item',
                            url: '/dashboard/assets',
                            // icon: icons['IconBug'],
                            breadcrumbs: false
                        },
                        {
                            id: 'requests',
                            title: <FormattedMessage id="All requests" />,
                            type: 'item',
                            url: '/dashboard/requests',
                            // icon: icons['IconBrandProducthunt'],
                            breadcrumbs: false
                        },
                        {
                            id: 'invoices',
                            title: <FormattedMessage id="Invoices" />,
                            type: 'item',
                            url: '/dashboard/invoices',
                            // icon: icons['IconBrandProducthunt'],
                            breadcrumbs: false
                        },
                        {
                            id: 'drivers',
                            title: <FormattedMessage id="List of drivers" />,
                            type: 'item',
                            url: '/dashboard/drivers',
                            // icon: icons['IconBrandProducthunt'],
                            breadcrumbs: false
                        }
                    ]
                }
            ]
        }
    ]
};

export default menuItems;
