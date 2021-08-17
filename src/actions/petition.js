import { PETITIONRECIPIENT, PETITIONCATEGORY } from '../constants/actionTypes';

export const storeRecipients = () => ({
    type: PETITIONRECIPIENT,
    data: null
});

export const storeCategories = () => ({
    type: PETITIONCATEGORY,
    data: null
});