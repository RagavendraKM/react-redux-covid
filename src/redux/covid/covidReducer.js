const { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE,
    FETCH_DISTRICT_REQUEST, FETCH_DISTRICT_SUCCESS, FETCH_DISTRICT_FAILURE,
    SORT_COLUMN, SEARCH_VALUE, SEARCH_DISTRICT_VALUE, LOAD_NEW_PAGE } = require("./covidItems")

const initialState = {
    loading: true,
    result: {},
    dupResult: {},
    distResult: {},
    dupDistResult: {},
    error: '',
    orderBy: 'desc',
    searchValue: [],
    showDiv: false,
    state: '',
    countPerPage: 5,
    filteredResult: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_SUCCESS:
            let count = action.payload.statewise.length;
            let countPerPage = state.countPerPage;
            let totalPages = Math.ceil(count / countPerPage);
            let filteredResult = action.payload.statewise.slice(1, countPerPage + 1);

            return {
                loading: false,
                result: action.payload,
                dupResult: action.payload,
                error: '',
                orderBy: 'desc',
                showDiv: false,
                totalPages: totalPages,
                currentPage: 1,
                totalCount: count,
                filteredResult: filteredResult,
                currentCount: countPerPage,
                countPerPage
            }
        case FETCH_FAILURE:
            return {
                loading: false,
                result: [],
                error: action.payload
            }
        case SORT_COLUMN:
            let sortFilteredResult = action.orderBy === "desc" ?
                state.filteredResult.sort((a, b) => b[action.key] - a[action.key]) :
                state.filteredResult.sort((a, b) => a[action.key] - b[action.key])
            return {
                ...state,
                result: {
                    cases_time_series: state.result.cases_time_series,
                    statewise: (action.orderBy === "desc" ?
                        state.result.statewise.sort((a, b) => b[action.key] - a[action.key])
                        : state.result.statewise.sort((a, b) => a[action.key] - b[action.key]))
                },
                filteredResult: sortFilteredResult,
                orderBy: action.orderBy === "desc" ? "asc" : "desc",
                showDiv: false
            }
        case SEARCH_VALUE:
            let value = action.payload.toLowerCase();
            let header = state.dupResult.statewise.filter(i => i.state === 'Total');
            let filteredValues = state.dupResult.statewise.filter(v => v.state.toLowerCase().includes(value));
            let filteredResult1 = filteredValues.slice(0, 5);
            return {
                ...state,
                dupResult: state.dupResult,
                result: {
                    ...state.result,
                    statewise: header
                },
                filteredResult: filteredResult1,
                totalPages: Math.ceil(filteredValues.length / 5) !== 1 ? 
                Math.ceil(filteredValues.length / 5) : 1,
                showDiv: false
            }
        case FETCH_DISTRICT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_DISTRICT_SUCCESS:
            return {
                ...state,
                state: state.result.statewise.map(s => s.state),
                loading: false,
                distResult: action.payload,
                dupDistResult: action.payload,
                error: '',
                orderBy: 'desc',
                showDiv: false
            }
        case FETCH_DISTRICT_FAILURE:
            return {
                loading: false,
                result: [],
                error: action.payload
            }
        case SEARCH_DISTRICT_VALUE:
            let value1 = action.payload ? action.payload.toLowerCase() : action.payload;
            let districts = state.dupDistResult[action.stateName]["districtData"]
            let filteredDistrictValues = {}
            for (const [key, value] of Object.entries(districts)) {
                if (key.toLowerCase().includes(value1)) {
                    filteredDistrictValues[key] = value;
                }
            }
            return {
                ...state,
                loading: false,
                dupDistResult: state.dupDistResult,
                distResult: {
                    ...state.dupDistResult,
                    [action.stateName]: {
                        "districtData": filteredDistrictValues
                    }
                },
                showDiv: true
            }
        case LOAD_NEW_PAGE:
            let loadNewPageState = Object.assign({}, state);
            let addPages = action.page;
            loadNewPageState.currentPage += addPages;
            let perPage = loadNewPageState.countPerPage;
            let nextRows;
            if (addPages === 1) {
                let upperCount = loadNewPageState.currentCount + perPage;
                let lowerCount = loadNewPageState.currentCount;
                loadNewPageState.currentCount += loadNewPageState.countPerPage;
                nextRows = loadNewPageState.result.statewise.slice(lowerCount + 1, upperCount + 1);
            } else if (addPages === -1) {
                let upperCount = loadNewPageState.currentCount;
                let lowerCount = loadNewPageState.currentCount - perPage;
                loadNewPageState.currentCount -= loadNewPageState.countPerPage;
                nextRows = loadNewPageState.result.statewise.slice(lowerCount - perPage + 1, upperCount - perPage + 1);
            }
            loadNewPageState.filteredResult = nextRows;
            console.log("aa", loadNewPageState);
            return loadNewPageState;
        default:
            return state
    }
}

export default reducer;