import { MONTH } from './const.js';


export const createElement = (tagName, attribute) => {
    const elem = document.createElement(tagName);
    Object.assign(elem, attribute);

    return elem;
};

export const pluralizeYears = (age) => {
    let years = age % 100;

    if (years >= 11 && years <= 19) {
        return 'лет';
    } else {
        let lastDigit = years % 10;
        if (lastDigit === 1) {
            return 'год';
        } else if (lastDigit >= 2 && lastDigit <= 4) {
            return 'года';
        } else {
            return 'лет';
        }
    }
};

export const pluralizeMonth = (monthDate) => {
    const month = MONTH[monthDate];

    return month;
};

export const handelImageFileSelection = (input, image) => {

};

export const createSelectDate = (selectDay, selectMonth, selectYear, birthdate) => {
    for (let day = 0; day <= 31; day++) {
        const option = createElement('option');

        option.value = day ? day : '';
        option.text = day ? day : '';

        selectDay.append(option);
    }

    const month = ['', 'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

    for (let i = 0; i < month.length; i++) {
        const option = createElement('option');

        option.value = i;
        option.text = month[i];

        selectMonth.append(option);
    }

    const currentYear = new Date().getFullYear();

    const optionYear = createElement('option');
    optionYear.value = '';
    optionYear.text = '';

    selectYear.append(optionYear);

    for (let year = currentYear; year >= currentYear - 100; year--) {
        const option = createElement('option');

        option.value = year;
        option.text = year;

        selectYear.append(option);
    }

    if (birthdate) {
        const [day, month, year] = birthdate.split('/');

        selectDay.value = day;
        selectMonth.value = month;
        selectYear.value = year;
    }

    [selectDay, selectMonth, selectYear].forEach(dateSelect => {
        dateSelect.addEventListener('change', ({ currentTarget }) => {
            currentTarget.blur();
        })
    })
};