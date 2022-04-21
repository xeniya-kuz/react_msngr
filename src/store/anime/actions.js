import { apiUrl } from "../../utils/constants";

export const REQUEST_ANIME_LOADING = "ANIME_REQUEST_LOADING";
export const REQUEST_ANIME_SUCCESS = "ANIME_REQUEST_SUCCESS";
export const REQUEST_ANIME_FAILURE = "ANIME_REQUEST_FAILURE";

export const animeLoading = () => ({
    type: REQUEST_ANIME_LOADING
});

export const animeSuccess = (animeList) => ({
    type: REQUEST_ANIME_SUCCESS,
    animeList
});

export const animeFailure = () => ({
    type: REQUEST_ANIME_FAILURE
});


export const animeList = () => async (dispatch) => {
    dispatch(animeLoading());
    try {
        const response = await fetch(apiUrl)

        console.log(response);
        if (!response.ok) {
            throw new Error('caution: Error');
        }

        const result = await response.json();

        dispatch(animeSuccess(result.data));

    }

    catch {
        dispatch(animeFailure());
    }
};