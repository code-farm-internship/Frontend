import React from 'react';
import { Layout, Row, Col, Typography, Space } from 'antd';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Title, Text, Link } = Typography;

const Footer: React.FC = () => {
    return (
        <AntFooter style={{ background: '#001529', padding: '48px 0 24px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
                <Row gutter={[32, 32]}>
                    {/* Giới thiệu */}
                    <Col xs={24} sm={12} md={8}>
                        <Title level={4} style={{ color: '#fff', marginBottom: 16 }}>
                            GIỚI THIỆU
                        </Title>
                        <Space direction='vertical' size='small'>
                            <Link style={{ color: '#fff' }}>Chính sách bảo mật</Link>
                            <Link style={{ color: '#fff' }}>Điều khoản sử dụng</Link>
                            <Link style={{ color: '#fff' }}>Hệ thống nhà sách</Link>
                            <Link style={{ color: '#fff' }}>Hệ thống phân phối</Link>
                        </Space>
                    </Col>

                    {/* Hỗ trợ */}
                    <Col xs={24} sm={12} md={8}>
                        <Title level={4} style={{ color: '#fff', marginBottom: 16 }}>
                            HỖ TRỢ
                        </Title>
                        <Space direction='vertical' size='small'>
                            <Link style={{ color: '#fff' }}>Hướng dẫn đặt hàng</Link>
                            <Link style={{ color: '#fff' }}>Phương thức thanh toán</Link>
                            <Link style={{ color: '#fff' }}>Chính sách đổi trả</Link>
                            <Link style={{ color: '#fff' }}>Phương thức vận chuyển</Link>
                        </Space>
                    </Col>

                    {/* Kết nối */}
                    <Col xs={24} md={8}>
                        <Title level={4} style={{ color: '#fff', marginBottom: 16 }}>
                            KẾT NỐI VỚI CHÚNG TÔI
                        </Title>
                        <Space size='large' style={{ marginBottom: 16 }}>
                            <Link style={{ color: '#fff', fontSize: 24 }} href='#'>
                                <FacebookOutlined />
                            </Link>
                            <Link style={{ color: '#fff', fontSize: 24 }} href='#'>
                                <InstagramOutlined />
                            </Link>
                            <Link style={{ color: '#fff', fontSize: 24 }} href='#'>
                                <TwitterOutlined />
                            </Link>
                        </Space>
                        <Space direction='vertical' size='small'>
                            <Text style={{ color: '#fff' }}>Hotline: 0123-456-789</Text>
                            <Text style={{ color: '#fff' }}>Email: contact@apobook.com</Text>
                        </Space>
                    </Col>
                </Row>

                {/* Bản quyền */}
                <Row
                    justify='center'
                    style={{
                        marginTop: 48,
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        paddingTop: 24,
                        textAlign: 'center',
                    }}
                >
                    <Col span={24}>
                        <Text style={{ color: 'rgba(255,255,255,0.6)' }}>© 2025 ApoBook. All Rights Reserved.</Text>
                    </Col>
                </Row>
            </div>
        </AntFooter>
    );
};

export default Footer;
