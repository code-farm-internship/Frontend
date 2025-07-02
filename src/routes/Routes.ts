import { publicRoutes } from './PublicRoutes';
import { privateRoutes } from './PrivateRoutes';

const RootRoutes = [...publicRoutes, ...privateRoutes];

export default RootRoutes;
