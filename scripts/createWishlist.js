import { auth, router } from './index.js';
import { getUser } from './serviceAPI.js';
import { createElement, pluralizeMonth, pluralizeYears } from './helper.js';
import { API_URL } from './const.js';


export const createWishlist = async (pageLogin) => {
    const login = auth.login;

    if (!pageLogin) {
        pageLogin = login;
    }

    const user = await getUser(pageLogin);

    const section = createElement('section', {
        className: 'wishlist',
    });

    const container = createElement('div', {
        className: 'container',
    });

    section.append(container);

    const profile = createElement('div', {
        className: 'wishlist__profile profile',
    });

    const avatar = createElement('img', {
        className: 'profile__avatar',
        src: 'img/avatar.png',
        alt: 'Аватар пользователя',
    });

    const content = createElement('div', {
        className: 'profile__content',
    });

    const fullName = user.name || user.surname
        ? `${user.name || ''} ${user.surname || ''}`.trim()
        : user.login;

    const name = createElement('h2', {
        className: 'profile__name',
        textContent: fullName,
    });

    content.append(name);

    if (user.birthdate) {
        const birthday = new Date(user.birthdate);
        const day = birthday.getDate();
        const month = pluralizeMonth(birthday.getMonth());
        // const month = birthday.toLocaleString('default', { month: 'long' });
        const ageDiffMs = Date.now() - birthday.getTime();
        const ageDate = new Date(ageDiffMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        const plural = pluralizeYears(age);
        const ageMessage = `${day} ${month} исполнится ${age} ${plural}`;


        const birthdateElem = createElement('p', {
            className: 'profile__birthday',
            textContent: ageMessage,
        });

        content.append(birthdateElem);
    }

    if (login === pageLogin) {
        const editBtn = createElement('button', {
            className: 'profile__edit',
            innerHTML: `<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.75 33.25H10.6875L28.1992 15.7384L22.2617 9.80086L4.75 27.3125V33.25ZM7.91667 28.6267L22.2617 14.2817L23.7183 15.7384L9.37333 30.0834H7.91667V28.6267ZM29.0858 5.20919C28.9394 5.06241 28.7654 4.94596 28.5738 4.86651C28.3823 4.78705 28.177 4.74615 27.9696 4.74615C27.7622 4.74615 27.5569 4.78705 27.3653 4.86651C27.1738 4.94596 26.9998 5.06241 26.8533 5.20919L23.9558 8.10669L29.8933 14.0442L32.7908 11.1467C32.9376 11.0002 33.0541 10.8262 33.1335 10.6347C33.213 10.4431 33.2539 10.2378 33.2539 10.0304C33.2539 9.82307 33.213 9.61774 33.1335 9.4262C33.0541 9.23466 32.9376 9.06067 32.7908 8.91419L29.0858 5.20919Z" fill="white" />
                        </svg>
                        <span>редактировать профиль</span>`,
        });

        editBtn.addEventListener('click', () => {
            router.setRoute(`/editprofile/${login}`);
        });

        content.append(editBtn);
    }

    profile.append(avatar, content);
    container.append(profile);

    if (user.description) {
        const description = createElement('p', {
            className: 'wishlist__description',
            innerText: user.description,
        });

        container.append(description);
    }

    if (!Object.keys(user.wish).length) {
        const noWish = createElement('p', {
            className: 'wishlist__no-wish',
            textContent: 'Список желаний пуст',
        });

        container.append(noWish);
    } else {
        const categoriesList = createElement('ul', {
            className: 'wishlist__categories categories',
        });

        container.append(categoriesList);

        for (const wishTitle in user.wish) {
            const categoriesItem = createElement('li', {
                className: 'categories__item',
            });

            const categoriesTitle = createElement('h3', {
                className: 'categories__title',
                textContent: wishTitle,
            });

            const wishList = createElement('ul', {
                className: 'wishlist__items',
            });

            categoriesItem.append(categoriesTitle, wishList);

            for (const item of user.wish[wishTitle]) {
                const itemElem = createElement('li', {
                    className: 'item',
                });

                const itemImg = createElement('img', {
                    className: 'item__image',
                    src: `${API_URL}/${item.img}`,
                    alt: item.title,
                });

                const itemTitle = createElement('h4', {
                    className: 'item__title',
                    textContent: item.title,
                });

                const itemPrice = createElement('p', {
                    className: 'item__price',
                    textContent: `${item.price} ${item.currency}`,
                });

                itemElem.append(itemImg, itemTitle, itemPrice);

                if (login === pageLogin) {
                    const itemBtn = createElement('button', {
                        className: 'item__btn btn btn_castling',
                        textContent: 'Выбрать',
                    });

                    itemElem.append(itemBtn);

                    itemBtn.addEventListener('click', () => {
                        router.setRoute(`/editwish/${item.id}`);
                    });
                }

                wishList.append(itemElem);
            }
            categoriesList.append(categoriesItem);
        }
    }
    return section;
};