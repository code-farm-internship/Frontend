import React from 'react';
import { Layout, Menu, Input, Badge, Button, Drawer } from 'antd';
import { UserOutlined, ShoppingCartOutlined, MenuOutlined } from '@ant-design/icons';
import { navItems } from '../../data/mock-data';
import { Link } from 'react-router-dom';

const { Header: AntHeader } = Layout;
const { Search } = Input;

const Header: React.FC = () => {
    const [visible, setVisible] = React.useState(false);

    return (
        <AntHeader style={{ background: '#fff', padding: 0, position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
            <div
                style={{
                    maxWidth: 1200,
                    margin: '0 auto',
                    padding: '0 16px',
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                <div className='logo' style={{ marginRight: 24 }}>
                    <h1 style={{ margin: 0, fontSize: 24, color: '#ff4d4f' }}>AyaBook</h1>
                </div>

                <div className='desktop-menu' style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <Menu mode='horizontal' style={{ border: 'none', flex: 1 }}>
                        {navItems.map((item) => (
                            <Menu.Item key={item.href}>
                                <Link to={item.href}>{item.label}</Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <Search placeholder='Tìm kiếm sách...' style={{ width: 200 }} />
                    <Button type='text' icon={<UserOutlined />} />
                    <Badge count={0}>
                        <Button type='text' icon={<ShoppingCartOutlined />} />
                    </Badge>
                    <Button
                        className='mobile-menu-button'
                        type='text'
                        icon={<MenuOutlined />}
                        onClick={() => {
                            setVisible(true);
                        }}
                    />
                </div>
            </div>

            <Drawer
                title='Menu'
                placement='right'
                onClose={() => {
                    setVisible(false);
                }}
                open={visible}
            >
                <Menu mode='vertical'>
                    {navItems.map((item) => (
                        <Menu.Item key={item.href}>{item.label}</Menu.Item>
                    ))}
                </Menu>
            </Drawer>
        </AntHeader>
    );
};

export default Header;
