import { useCartStore } from '@/store/cartStore';
import { useUserStore } from '@/store/userStore';
import { MenuOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { navItems } from '../../data/mock-data';
import CartDrawer from '../CartDrawer/CartDrawer';
import HeaderUserToolbar from './HeaderUserToolbar';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const setToggleCart = useCartStore((state) => state.toggleCart);
    const cartQuantity = useCartStore((state) => state.cartQuantity);
    const isAuthenticate = useUserStore((state) => state.isAuthenticate);

    return (
        <header className='sticky top-0 z-50 bg-white shadow-md'>
            {/* Top bar with contact info */}
            <div className='hidden bg-gray-900 py-2 text-sm text-white md:block'>
                <div className='mx-auto flex max-w-7xl items-center justify-between px-4'>
                    <div className='flex items-center space-x-4'>
                        <span>Hotline: 0123-456-789</span>
                        <span>Email: contact@apobook.com</span>
                    </div>
                    <div className='flex items-center space-x-4'>
                        <Link to='/track-order' className='transition-colors hover:text-red-400'>
                            Theo dõi đơn hàng
                        </Link>
                        <Link to='/stores' className='transition-colors hover:text-red-400'>
                            Hệ thống cửa hàng
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main header */}
            <div className='border-b'>
                <div className='mx-auto w-full max-w-7xl px-8'>
                    <div className='flex h-16 items-center justify-between md:h-20'>
                        {/* Logo */}
                        <Link to='/' className='flex items-center'>
                            <span className='text-2xl font-bold tracking-tight text-red-500 md:text-3xl'>ApoBook</span>
                        </Link>

                        {/* Search bar - desktop */}
                        <div className='mx-8 hidden max-w-xl flex-1 md:flex'>
                            <div className='relative w-full'>
                                <input
                                    type='text'
                                    placeholder='Tìm kiếm sách, tác giả...'
                                    className='w-full rounded-full border border-gray-200 py-2 pl-12 pr-4 transition-all focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200'
                                />
                                <SearchOutlined className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className='flex items-center space-x-1 md:space-x-4'>
                            <HeaderUserToolbar />
                            <div
                                className='cursor-pointer p-2'
                                onClick={() => {
                                    if (isAuthenticate) {
                                        setToggleCart();
                                    }
                                }}
                            >
                                <Badge size='small' count={cartQuantity}>
                                    <ShoppingCartOutlined className='text-2xl' />
                                </Badge>
                            </div>

                            <button
                                className='p-2 text-gray-600 transition-colors hover:text-red-500 md:hidden'
                                onClick={() => {
                                    setIsMenuOpen(!isMenuOpen);
                                }}
                            >
                                <MenuOutlined className='text-xl' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            {/* <nav className='hidden border-b md:block'>
                <div className='mx-auto max-w-7xl px-4'>
                    <div className='flex h-12 items-center justify-between'>
                        <div className='flex items-center space-x-8'>
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    className='font-medium text-gray-600 transition-colors hover:text-red-500'
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        <div className='flex items-center space-x-4 text-sm'>
                            <Link to='/new-releases' className='text-gray-600 transition-colors hover:text-red-500'>
                                Sách mới
                            </Link>
                            <Link to='/best-sellers' className='text-gray-600 transition-colors hover:text-red-500'>
                                Bán chạy
                            </Link>
                            <Link to='/promotions' className='text-gray-600 transition-colors hover:text-red-500'>
                                Khuyến mãi
                            </Link>
                        </div>
                    </div>
                </div>
            </nav> */}

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className='border-t bg-white md:hidden'>
                    <div className='mx-auto max-w-7xl px-4 py-4'>
                        <div className='mb-4 flex items-center'>
                            <SearchOutlined className='mr-3 text-gray-400' />
                            <input
                                type='text'
                                placeholder='Tìm kiếm sách...'
                                className='w-full rounded-lg border border-gray-200 px-4 py-2 transition-all focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200'
                            />
                        </div>
                        <nav className='space-y-4'>
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    className='block border-b py-2 text-gray-600 transition-colors hover:text-red-500'
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Link
                                to='/new-releases'
                                className='block border-b py-2 text-gray-600 transition-colors hover:text-red-500'
                                onClick={() => {
                                    setIsMenuOpen(false);
                                }}
                            >
                                Sách mới
                            </Link>
                            <Link
                                to='/best-sellers'
                                className='block border-b py-2 text-gray-600 transition-colors hover:text-red-500'
                                onClick={() => {
                                    setIsMenuOpen(false);
                                }}
                            >
                                Bán chạy
                            </Link>
                            <Link
                                to='/promotions'
                                className='block border-b py-2 text-gray-600 transition-colors hover:text-red-500'
                                onClick={() => {
                                    setIsMenuOpen(false);
                                }}
                            >
                                Khuyến mãi
                            </Link>
                            <div className='space-y-4 pt-4'>
                                <Link
                                    to='/track-order'
                                    className='block text-gray-600 transition-colors hover:text-red-500'
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    Theo dõi đơn hàng
                                </Link>
                                <Link
                                    to='/stores'
                                    className='block text-gray-600 transition-colors hover:text-red-500'
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    Hệ thống cửa hàng
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
            {isAuthenticate && <CartDrawer />}
        </header>
    );
};

export default Header;
