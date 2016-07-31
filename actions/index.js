export const setMaxTime = payload => ({type: 'SET_MAX_TIME', payload: Number(payload) * 60000});

export const setMinTime = payload => ({type: 'SET_MIN_TIME', payload: Number(payload) * 60000});

export const setWarnTime = payload => ({type: 'SET_WARN_TIME', payload: Number(payload) * 60000});

export const setRunning = payload => ({type: 'SET_RUNNING', payload});

export const setPaused = payload => ({type: 'SET_PAUSED', payload});

export const setDimensions = (width, height) => ({type: 'SET_DIMENSIONS', payload: {width, height}});
