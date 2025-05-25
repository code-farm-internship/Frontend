import React from 'react';
import { Typography, Row, Col } from 'antd';
import BookGrid from '../components/common/BookGrid';
import { bestSellers } from '../data/mock-data';

const { Title, Paragraph } = Typography;

const BookIntro: React.FC = () => {
    return (
        <div style={{ padding: '40px' }}>
            <Row gutter={[32, 32]} align='middle' style={{ marginBottom: '40px' }}>
                <Col xs={24} md={12}>
                    <img
                        src='https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=compress&cs=tinysrgb&w=800'
                        alt='Thư viện sách'
                        style={{ width: '100%', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
                    />
                </Col>
                <Col xs={24} md={12}>
                    <div style={{ textAlign: 'left' }}>
                        <Title level={2}>Chào mừng đến với AyaBook</Title>
                        <Paragraph>
                            {`"Khám phá thế giới tri thức rộng lớn và nguồn cảm hứng bất tận thông qua hàng ngàn đầu sách thuộc nhiều thể loại khác nhau – từ văn học kinh điển, kinh doanh hiện đại, đến sách kỹ năng, thiếu nhi và học thuật – tất cả đều được tuyển chọn kỹ lưỡng để phục vụ mọi lứa tuổi, mọi đam mê và mọi hành trình khám phá bản thân. Tại BookStore, chúng tôi tin rằng mỗi cuốn sách là một cánh cửa mở ra những chân trời mới, nơi người đọc có thể tiếp cận tri thức, rèn luyện tư duy phản biện, nuôi dưỡng tâm hồn và phát triển kỹ năng sống một cách toàn diện. Dù bạn là học sinh, sinh viên đang tìm kiếm tài liệu học tập chất lượng, một người đi làm mong muốn nâng cao năng lực chuyên môn, hay đơn giản là một người yêu sách muốn đắm chìm trong những câu chuyện giàu cảm xúc – tại đây, bạn sẽ luôn tìm thấy những gì mình cần. Với sự tận tâm trong việc lựa chọn nội dung, cập nhật xu hướng xuất bản mới nhất và cam kết mang lại trải nghiệm mua sắm dễ dàng, tiện lợi, BookStore không chỉ là nơi mua sách mà còn là người bạn đồng hành đáng tin cậy trong hành trình học tập và phát triển bản thân suốt đời."`}
                        </Paragraph>
                    </div>
                </Col>
            </Row>

            <BookGrid title='SÁCH BÁN CHẠY NHẤT' books={bestSellers} />
        </div>
    );
};

export default BookIntro;
