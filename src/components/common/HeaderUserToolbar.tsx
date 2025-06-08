import { useUserStore } from '@/store/userStore';
import { UserOutlined } from '@ant-design/icons';
import Dropdown from 'antd/es/dropdown/dropdown';
import { memo } from 'react';
import { GetUserToolbarItems } from '../element/GetUserToolbarItems';

const HeaderUserToolbar = () => {
    const userInfo = useUserStore((state) => state.user);

    return (
        <>
            <Dropdown menu={{ items: GetUserToolbarItems() }}>
                <div className='group flex cursor-pointer items-center p-2 text-gray-600 transition-colors'>
                    <UserOutlined className='text-xl' />
                    <span className='ml-2 hidden w-20 truncate group-hover:text-primary md:inline'>
                        {userInfo.username || 'Tài khoản'}
                    </span>
                </div>
            </Dropdown>
        </>
    );
};

export default memo(HeaderUserToolbar);
