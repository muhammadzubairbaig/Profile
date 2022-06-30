import { UserIcon } from "@heroicons/react/solid";

export const routeConstantsService = (() => {
    /**
     * NOTE: Declare all routes which doesn't require authentication over here.
     */
    const Routes = {

        viewProfile: {
            key: 'view-profile',
            title: 'View Profile',
            path: '/',
        },
        updateProfile: {
            key: 'update-profile',
            title: 'Update Profile',
            path: '/update-profile',
        },
    };

    const navigation = [
        { name: 'View Profile', href: '/', icon: UserIcon, current: false, key: 'view-profile' },
    ]

    /**
     * Return Constants
     */
    return {
        Routes, navigation
    };
})();
