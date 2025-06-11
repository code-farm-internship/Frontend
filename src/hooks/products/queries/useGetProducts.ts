// import { QUERY_KEYS } from '@/constants/queryKeys';
// import productService from '@/services/product.service';
// import { useQuery } from '@tanstack/react-query';

// type ProductQueryParams = {
//   page?: number;
//   limit?: number;
//   category?: string;
//   sortBy?: string;
//   search?: string;
// };

// export const useGetProducts = (params?: ProductQueryParams) => {
//   return useQuery({
//     queryKey: [...QUERY_KEYS.product.list, params],
//     queryFn: () => productService.getProducts(params),
//     enabled: true,
//   });
// };
