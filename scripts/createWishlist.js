import { auth } from './index.js';

export const createWishlist = async (pageLogin) => {
    const login = auth.login;

    if (!pageLogin) {
        pageLogin = login;
    }

    // const user = await getUser(pageLogin);
};