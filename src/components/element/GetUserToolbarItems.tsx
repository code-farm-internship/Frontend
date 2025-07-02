import { PUBLIC_ROUTES } from '@/constants/routes';
import { useUserStore } from '@/store/userStore';
import { MenuProps } from 'antd';
import HeaderToolbarItem from './HeaderToolbarItem';

export const GetUserToolbarItems = () => {
    const isAuthenticate = useUserStore((state) => state.isAuthenticate);
    const userInfo = useUserStore((state) => state.user);

    const loggedItems: MenuProps['items'] = [
        {
            key: 'profile',
            label: <HeaderToolbarItem title='Profile' route={PUBLIC_ROUTES.PROFILE} />,
        },
        ...(userInfo.role === 'admin' || userInfo.role === 'manager'
            ? [
                  {
                      key: 'admin',
                      label: <HeaderToolbarItem title='Admin Panel' route='/admin' />,
                  },
              ]
            : []),
        {
            key: 'logout',
            label: (
                <HeaderToolbarItem
                    title='Log out'
                    handleAction={() => {
                        console.log('hehe');
                    }}
                />
            ),
        },
    ];

    const notLoggedItems: MenuProps['items'] = [
        {
            key: 'login',
            label: <HeaderToolbarItem title='Login' route={PUBLIC_ROUTES.LOGIN} />,
        },
        {
            key: 'signup',
            label: <HeaderToolbarItem title='Sign up' route={PUBLIC_ROUTES.REGISTER} />,
        },
    ];

    if (isAuthenticate) {
        return loggedItems;
    }

    return notLoggedItems;
};
