import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { normalize, schema } from 'normalizr';

const Subscription = new schema.Entity('subscriptions', {});
const SubscriptionsList = new schema.Array(Subscription);

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  podcastRequest: ['data'],
  podcastSuccess: ['payload'],
  podcastFailure: null,
  episodesRequest: ['itunesId'],
  episodesSuccess: ['payload'],
  episodesFailure: null,
});

export const PodcastTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  byId: {},
  allIds: [],
  fetching: null,
  item: null,
  episodes: [],
  error: null,
});

/* ------------- Selectors ------------- */

export const PodcastSelectors = {
  getData: state => state.data,
};

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state => state.merge({ fetching: true, error: null });

// successful api lookup
export const getPodcastsSuccess = (state, action) => {
  const { payload } = action;
  const normalData = normalize(payload.subscriptions, SubscriptionsList);
  return state.merge({
    fetching: false,
    error: null,
    byId: normalData.entities.subscriptions,
    allIds: normalData.result,
  });
};

export const getEpisodesSuccess = (state, action) => {
  const { payload } = action;
  // const normalData = normalize(payload.subscriptions, SubscriptionsList);
  return state.merge({
    fetching: false,
    error: null,
    item: payload.podcast,
    episodes: payload.episodes,
  });
};

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PODCAST_REQUEST]: request,
  [Types.PODCAST_SUCCESS]: getPodcastsSuccess,
  [Types.PODCAST_FAILURE]: failure,
  [Types.EPISODES_REQUEST]: request,
  [Types.EPISODES_SUCCESS]: getEpisodesSuccess,
  [Types.EPISODES_FAILURE]: failure,
});
