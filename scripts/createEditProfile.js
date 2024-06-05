import { getUser, sendDataUser } from './serviceAPI.js';
import { createElement, createSelectDate, handelImageFileSelection } from './helper.js';
import { API_URL } from './const.js';
import { router } from './index.js';


export const createEditProfile = async (login) => {
    const user = await getUser(login);

    const sectionEditProfile = createElement('section', {
        className: 'edit edit_profile',
    });

    const container = createElement('div', {
        className: 'container',
    });

    sectionEditProfile.append(container);

    const formProfile = createElement('form', {
        className: 'edit__form',
    });

    formProfile.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        data.birthdate = `${data.month}/${data.day}/${data.year}`;

        await sendDataUser(user.id, data);
        router.setRoute(`/user/${login}`);
    });

    const editAvatar = createElement('fieldset', {
        className: 'edit__avatar',
    });

    const editAvatarImage = createElement('img', {
        className: 'edit__avatar-image',
        src: `${API_URL}/${user.avatar}`,
        alt: `Аватар ${user.login}`,
    });

    const editAvatarLoad = createElement('div', {
        className: 'edit__avatar-load',
    });

    const editAvatarLabel = createElement('label', {
        className: 'edit__label-avatar',
        htmlFor: 'avatar-load',
        innerHTML: `
            <svg class="edit__icon-avatar" width="38" height="38" viewBox="0 0 38 38" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.48842 29.6389C9.48842 31.35 10.9027 32.75 12.6313 32.75H25.2027C26.9313 32.75 28.3456 31.35 28.3456 29.6389V10.9722H9.48842V29.6389ZM12.6313 14.0833H25.2027V29.6389H12.6313V14.0833ZM24.417 6.30556L22.8456 4.75H14.9884L13.417 6.30556H7.91699V9.41667H29.917V6.30556H24.417Z"
                    fill="white" />
            </svg>
            Обновить фотографию
        `,
    });

    const editAvatarInput = createElement('input', {
        className: 'edit__input-file edit__input-file_avatar',
        type: 'file',
        accept: 'image/jpeg, image/png',
        id: 'avatar-load',
    });

    const editHiddenInput = createElement('input', {
        type: 'hidden',
        name: 'avatar',
    });

    handelImageFileSelection(editAvatarInput, editAvatarImage, editHiddenInput);

    const btnDeleteAvatar = createElement('button', {
        className: 'edit__avatar-delete',
        type: 'button',
        innerHTML: `
            <svg class="edit__icon-avatar" width="38" height="38" viewBox="0 0 38 38" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                d="M9.48842 29.6389C9.48842 31.35 10.9027 32.75 12.6313 32.75H25.2027C26.9313 32.75 28.3456 31.35 28.3456 29.6389V10.9722H9.48842V29.6389ZM12.6313 14.0833H25.2027V29.6389H12.6313V14.0833ZM24.417 6.30556L22.8456 4.75H14.9884L13.417 6.30556H7.91699V9.41667H29.917V6.30556H24.417Z"
                fill="white" />
            </svg>
            Удалить
        `,
    });

    btnDeleteAvatar.addEventListener('click', () => {
        editAvatar.value = '';
        editAvatarImage.src = 'img/avatar.png';
    });

    editAvatarLoad.append(editAvatarLabel, editAvatarInput, editHiddenInput, btnDeleteAvatar);
    editAvatar.append(editAvatarImage, editAvatarLoad);

    const editName = createElement('fieldset', {
        className: 'edit__name',
    });

    const editNameLabel = createElement('label', {
        className: 'edit__label',
        innerHTML: '<span class="edit__label-text">Имя:</span>',
    });

    const editNameInput = createElement('input', {
        className: 'edit__input',
        type: 'text',
        name: 'name',
        value: user.name || '',
    });

    editNameLabel.append(editNameInput);

    const editSurnameLabel = createElement('label', {
        className: 'edit__label',
        innerHTML: '<span class="edit__label-text">Фамилия:</span>',
    });

    const editSurnameInput = createElement('input', {
        className: 'edit__input',
        type: 'text',
        name: 'surname',
        value: user.surname || '',
    });

    editSurnameLabel.append(editSurnameInput);
    editName.append(editNameLabel, editSurnameLabel);

    const editBirthday = createElement('fieldset', {
        className: 'edit__birthdate',
    });

    const editBirthdayLabel = createElement('legend', {
        className: 'edit__label edit__label-text',
        textContent: 'Дата рождения:',
    });

    const editBirthdayWrapper = createElement('div', {
        className: 'edit__birthday-wrapper',
    });

    editBirthday.append(editBirthdayLabel, editBirthdayWrapper);

    const editBirthdayLabelDay = createElement('label', {
        className: 'edit__label edit__label_select',
    });

    const editBirthdaySelectDay = createElement('select', {
        className: 'edit__select',
        name: 'day',
    });

    editBirthdayLabelDay.append(editBirthdaySelectDay);

    const editBirthdayLabelMonth = createElement('label', {
        className: 'edit__label edit__label_select',
    });

    const editBirthdaySelectMonth = createElement('select', {
        className: 'edit__select',
        name: 'month',
    });

    editBirthdayLabelMonth.append(editBirthdaySelectMonth);

    const editBirthdayLabelYear = createElement('label', {
        className: 'edit__label edit__label_select',
    });

    const editBirthdaySelectYear = createElement('select', {
        className: 'edit__select',
        name: 'year',
    });

    createSelectDate(editBirthdaySelectDay, editBirthdaySelectMonth, editBirthdaySelectYear, user.birthdate);

    editBirthdayLabelYear.append(editBirthdaySelectYear);
    editBirthdayWrapper.append(editBirthdayLabelDay, editBirthdayLabelMonth, editBirthdayLabelYear);

    const editDescription = createElement('fieldset', {
        className: 'edit__description',
    });

    const editDescriptionLabel = createElement('label', {
        className: 'edit__label-text',
        textContent: 'Вступительный текст:',
        htmlFor: 'description',
    });

    const editDescriptionTextarea = createElement('textarea', {
        className: 'edit__description-input',
        name: 'description',
        id: 'description',
        value: user.description,
    });

    editDescription.append(editDescriptionLabel, editDescriptionTextarea);

    const editSubmitBtn = createElement('button', {
        className: 'edit__submit-btn btn',
        textContent: 'Сохранить изменения',
        type: 'submit',
    });

    formProfile.append(editAvatar, editName, editBirthday, editDescription, editSubmitBtn);
    container.append(formProfile);


    return { sectionEditProfile, formProfile };
};