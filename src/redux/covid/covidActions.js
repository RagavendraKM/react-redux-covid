import {
    FETCH_FAILURE, FETCH_REQUEST, FETCH_SUCCESS,
    SORT_COLUMN, SEARCH_VALUE, SEARCH_DISTRICT_VALUE,
    FETCH_DISTRICT_FAILURE, FETCH_DISTRICT_REQUEST, FETCH_DISTRICT_SUCCESS,
    LOAD_EXACT_PAGE, LOAD_NEW_PAGE
} from './covidItems';
import axios from 'axios';

export const fetchRequest = () => {
    return {
        type: FETCH_REQUEST,
    }
}

export const fetchSuccess = (data) => {
    return {
        type: FETCH_SUCCESS,
        payload: data
    }
}

export const fetchFailure = (error) => {
    return {
        type: FETCH_FAILURE,
        payload: error
    }
}

export const fetchStateResults = () => {   // Async actions return another function instead of action itself.
    return async (dispatch) => {      // Function which is returned will have dispatch as its argument
        try {
            const response = await axios.get('https://api.covid19india.org/data.json');
            const result = response.data;
            dispatch(fetchSuccess(result));
        } catch (error) {
            const errorMsg = error.message;
            dispatch(fetchFailure(errorMsg));
        }
    }
}

export const fetchDistrictRequest = () => {
    return {
        type: FETCH_DISTRICT_REQUEST,
    }
}

export const fetchDistrictSuccess = (data) => {
    return {
        type: FETCH_DISTRICT_SUCCESS,
        payload: data
    }
}

export const fetchDistrictFailure = (error) => {
    return {
        type: FETCH_DISTRICT_FAILURE,
        payload: error
    }
}

export const fetchDistrictResults = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('https://api.covid19india.org/state_district_wise.json');
            const result = response.data;
            dispatch(fetchDistrictSuccess(result));
        } catch (error) {
            const errorMsg = error.message;
            dispatch(fetchDistrictFailure(errorMsg));
        }
    }
}

export const sortColumn = (key, orderBy) => {
    return {
        type: SORT_COLUMN,
        orderBy: orderBy,
        key: key
    }
}

export const searchValue = (value) => {
    return {
        type: SEARCH_VALUE,
        payload: value
    }
}

export const searchDistrictValue = (value, stateName) => {
    return {
        type: SEARCH_DISTRICT_VALUE,
        payload: value,
        stateName: stateName
    }
}

export const loadNewPage = page => ({
    type: LOAD_NEW_PAGE,
    page: page
});

export const loadExactPage = payload => ({
    type: LOAD_EXACT_PAGE,
    payload
});