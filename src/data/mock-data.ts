import { Book, Category, Banner, NavItem } from '../types';

export const navItems: NavItem[] = [
    { label: 'Trang Chủ', href: '/' },
    { label: 'Sản phẩm', href: '/products/all' },
    { label: 'Liên hệ với chúng tôi', href: 'https://web.facebook.com/groups/3778664455722812' },
];

export const banners: Banner[] = [
    {
        id: '1',
        title: 'Tôi, một góc trời',
        description: 'Khám phá những câu chuyện đầy cảm xúc và ý nghĩa trong tuyển tập mới nhất',
        image: 'https://images.pexels.com/photos/3747516/pexels-photo-3747516.jpeg',
        link: '/featured/1',
    },
    {
        id: '2',
        title: 'Học để trưởng thành',
        description: 'Một hành trình qua những hương thơm ngọt ngào và rực rỡ',
        image: 'https://thuviensachco.com/wp-content/uploads/2024/06/banner.jpg',
        link: '/featured/2',
    },
    {
        id: '3',
        title: 'Vượt sóng gió',
        description: 'Câu chuyện của những con người không ngừng vươn lên',
        image: 'https://www.vietnambooking.com/wp-content/uploads/2017/03/tin-tuc-thu-vien-lon-nhat-the-gioi-10-3-2017.jpg',
        link: '/featured/3',
    },
];

export const newReleases: Book[] = [
    {
        id: '1',
        title: 'Mèo Ai Lờ Còn Nguyên - Tập 3',
        price: 35000,
        coverImage:
            'https://images.pexels.com/photos/1741229/pexels-photo-1741229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
        id: '2',
        title: 'Mèo Họa Sĩ - Tập 14',
        price: 33000,
        coverImage:
            'https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
        id: '3',
        title: 'World Trigger - Tập 4',
        price: 32000,
        coverImage:
            'https://images.pexels.com/photos/1886581/pexels-photo-1886581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
        id: '4',
        title: 'Đóng Ngôi Tươi Vì Trăng',
        price: 45000,
        coverImage:
            'https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
];

export const bestSellers: Book[] = [
    {
        id: '5',
        title: 'Shin - Cậu Bé Bút Chì - Tập 1',
        price: 30000,
        coverImage:
            'https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
        id: '6',
        title: 'Naruto - Quyển 20',
        price: 33000,
        coverImage:
            'https://images.pexels.com/photos/3662845/pexels-photo-3662845.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
        id: '7',
        title: 'One Piece - Tập 101',
        price: 34000,
        coverImage:
            'https://images.pexels.com/photos/5887107/pexels-photo-5887107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
        id: '8',
        title: 'Đứa Nhật Khi Nào - Tập 1',
        price: 35000,
        coverImage:
            'https://images.pexels.com/photos/4906382/pexels-photo-4906382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
];

export const recommendedBooks: Book[] = [
    {
        id: '9',
        title: 'Nghĩ Giàu Và Làm Giàu',
        price: 120000,
        coverImage:
            'https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
        id: '10',
        title: 'Luật Năng Động Vũ Trụ',
        price: 135000,
        coverImage:
            'https://images.pexels.com/photos/1744663/pexels-photo-1744663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
        id: '11',
        title: 'Sách Làm Giàu Không Khó',
        price: 150000,
        coverImage:
            'https://images.pexels.com/photos/3747497/pexels-photo-3747497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
        id: '12',
        title: 'Think Again',
        price: 180000,
        coverImage:
            'https://images.pexels.com/photos/1148399/pexels-photo-1148399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
];

export const categories: Category[] = [
    {
        id: '1',
        name: 'Sách mới',
        books: newReleases,
    },
    {
        id: '2',
        name: 'Bán chạy nhất',
        books: bestSellers,
    },
    {
        id: '3',
        name: 'Đề xuất',
        books: recommendedBooks,
    },
];
