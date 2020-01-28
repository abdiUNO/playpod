import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  playEpisode: ['episode', 'author'],
  trackLoaded: ['duration'],
  trackBuffered: null,
  progress: ['progress'],
  playPause: null,
});

export const PlayerTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  paused: false,
  buffered: false,
  data: null,
  loading: false,
  track: null,
  error: null,
});

/* ------------- Selectors ------------- */

export const PlayerSelectors = {
  getData: state => state.data,
};

/* ------------- Reducers ------------- */

// request the data from an api
export const playerTrack = (state, { episode, author }) => {
  return state.merge({
    fetching: true,
    paused: false,
    buffered: false,
    loading: true,
    track: { ...episode, author },
  });
};

// successful api lookup
export const onLoad = (state, { duration }) => {
  return state.merge({
    loading: false,
    duration: duration,
    error: null,
  });
};

// Something went wrong somewhere.
export const onBuffered = state => state.merge({ buffered: true });

export const onProgress = (state, { progress }) => {
  return state.merge({ progress });
};

export const pauseTrack = state => state.merge({ paused: !state.paused });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PLAY_EPISODE]: playerTrack,
  [Types.TRACK_LOADED]: onLoad,
  [Types.TRACK_BUFFERED]: onBuffered,
  [Types.PROGRESS]: onProgress,
  [Types.PLAY_PAUSE]: pauseTrack,
});
