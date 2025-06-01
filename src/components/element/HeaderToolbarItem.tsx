import { memo } from 'react';
import { Link } from 'react-router-dom';

type UserToolbarProps = {
    route?: string;
    title: string;
    handleAction?: () => void;
};
const HeaderToolbarItem = ({ route, title, handleAction }: UserToolbarProps) => {
    const isHandleAction = typeof handleAction === 'function';
    return (
        <div
            className='space-y-1'
            onClick={() => {
                if (isHandleAction) {
                    handleAction();
                }
            }}
        >
            {route ? (
                <Link className='inline-block w-full text-secondary hover:text-primary' to={route}>
                    {title}
                </Link>
            ) : (
                <span>{title}</span>
            )}
        </div>
    );
};

export default memo(HeaderToolbarItem);
