import React, { useState, useEffect } from 'react';
import { Select, Checkbox, Slider, Button, Input, Pagination } from 'antd';
import { FilterOutlined, AppstoreOutlined, UnorderedListOutlined, SearchOutlined } from '@ant-design/icons';
import { ProductsParams } from '@/types/product';
import { useGetProducts } from '@/hooks/products/queries/useGetProducts';
import productService from '@/services/product.service';
import ProductGrid from './component/Products';

const { Option } = Select;

const AllProducts: React.FC = () => {
    const [filters, setFilters] = useState<ProductsParams>({
        page: 1,
        limit: 24,
        category: '',
        minPrice: 0,
        maxPrice: 1000000,
        sortBy: '',
        search: ''
    });
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showFilters, setShowFilters] = useState(true);
    const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
    const [searchValue, setSearchValue] = useState('');

    const { data, isLoading, error } = useGetProducts(filters);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await productService.getCategories();
                const fetchedCategories = res.data?.categories || [];
                setCategories(fetchedCategories);
            } catch (err) {
                console.error('Failed to fetch categories', err);
            }
        };
        void fetchCategories(); // ✅ dùng void để xử lý promise đúng cách
    }, []);

    const handleFilterChange = (key: keyof ProductsParams, value: any) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
            page: 1
        }));
    };

    const handleSearch = () => {
        handleFilterChange('search', searchValue);
    };

    const handlePageChange = (page: number, pageSize?: number) => {
        setFilters(prev => ({
            ...prev,
            page,
            ...(pageSize && { limit: pageSize })
        }));
    };

    const resetFilters = () => {
        setFilters({
            page: 1,
            limit: 24,
            category: '',
            minPrice: 0,
            maxPrice: 1000000,
            sortBy: '',
            search: ''
        });
        setSearchValue('');
    };

    const priceRanges = [
        { label: '0đ - 150,000đ', value: [0, 150000] },
        { label: '150,000đ - 300,000đ', value: [150000, 300000] },
        { label: '300,000đ - 500,000đ', value: [300000, 500000] },
        { label: '500,000đ - 700,000đ', value: [500000, 700000] }
    ];

    if (error) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Có lỗi xảy ra</h3>
                    <p className="text-gray-500 mb-4">
                        Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.
                    </p>
                    <Button type="primary" onClick={() => window.location.reload()}>
                        Tải lại trang
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* ... giữ nguyên phần JSX UI */}
            {/* Chỉ cần đảm bảo chỗ nào có error như `${error}`, `${number}` thì ép kiểu */}
        </div>
    );
};

export default AllProducts;
