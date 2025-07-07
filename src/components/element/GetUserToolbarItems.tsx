import { PUBLIC_ROUTES } from '@/constants/routes';
import { useUserStore } from '@/store/userStore';
import { MenuProps } from 'antd';
import HeaderToolbarItem from './HeaderToolbarItem';
import useLogout from '@/hooks/auth/mutations/useLogout';

export const GetUserToolbarItems = () => {
    const isAuthenticate = useUserStore((state) => state.isAuthenticate);
    const { mutate: logout, isPending } = useLogout();
    const handleLogout = () => {
        logout();
    };

    const loggedItems: MenuProps['items'] = [
        {
            key: 'profile',
            label: <HeaderToolbarItem title='Hồ sơ' route={PUBLIC_ROUTES.PROFILE} />,
        },
        {
            key: 'logout',
            label: (
                <HeaderToolbarItem title={isPending ? 'Đang đăng xuất...' : 'Đăng xuất'} handleAction={handleLogout} />
            ),
        },
    ];

    const notLoggedItems: MenuProps['items'] = [
        {
            key: 'login',
            label: <HeaderToolbarItem title='Đăng nhập' route={PUBLIC_ROUTES.LOGIN} />,
        },
        {
            key: 'signup',
            label: <HeaderToolbarItem title='Đăng ký' route={PUBLIC_ROUTES.REGISTER} />,
        },
    ];

    if (isAuthenticate) {
        return loggedItems;
    }

    return notLoggedItems;
};
