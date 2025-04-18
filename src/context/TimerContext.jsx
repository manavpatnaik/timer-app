import { type } from "@testing-library/user-event/dist/type";
import {
  loadHistory,
  loadTimers,
  saveHistory,
  saveTimers,
} from "../utils/storage";

const {
  createContext,
  act,
  useReducer,
  useEffect,
  useContext,
} = require("react");

const TimerContext = createContext();

const initialState = {
  timers: [],
  history: [],
  showCompletionModal: false,
  completedTimerName: "",
};

const ADD_TIMER = "ADD_TIMER";
const START_TIMER = "START_TIMER";
const PAUSE_TIMER = "PAUSE_TIMER";
const RESET_TIMER = "RESET_TIMER";
const UPDATE_TIMER = "UPDATE_TIMER";
const COMPLETE_TIMER = "COMPLETE_TIMER";
const START_CATEGORY = "START_CATEGORY";
const PAUSE_CATEGORY = "PAUSE_CATEGORY";
const RESET_CATEGORY = "RESET_CATEGORY";
const CLOSE_MODAL = "CLOSE_MODAL";
const LOAD_DATA = "LOAD_DATA";

const timerReducer = (state, action) => {
  switch (action.type) {
    case ADD_TIMER:
      return {
        ...state,
        timers: action.payload
          ? [
              ...state.timers,
              {
                ...action.payload,
                id: Date.now().toString(),
                remainingTime: action.payload.duration,
                status: "Paused", // Ensure the timer starts in "Paused" state
              },
            ]
          : [...state.timers],
      };

    case START_TIMER:
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload ? { ...timer, status: "Running" } : timer
        ),
      };

    case PAUSE_TIMER:
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload ? { ...timer, status: "Paused" } : timer
        ),
      };

    case RESET_TIMER:
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload
            ? {
                ...timer,
                remainingTime: timer.duration,
                status: "Paused",
              }
            : timer
        ),
      };

    case UPDATE_TIMER:
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload.id // Fix payload access for `id`
            ? {
                ...timer,
                remainingTime: action.payload.remainingTime,
              }
            : timer
        ),
      };

    case COMPLETE_TIMER:
      const completedTimer = state.timers.find(
        (timer) => timer.id === action.payload
      );

      // Prevent redundant updates if the timer is already completed
      if (!completedTimer || completedTimer.status === "Completed") {
        return state;
      }

      const historyEntry = {
        id: Date.now().toString(),
        timerName: completedTimer.name,
        category: completedTimer.category,
        duration: completedTimer.duration,
        completedAt: new Date().toISOString(),
      };

      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload
            ? {
                ...timer,
                status: "Completed",
                remainingTime: 0,
              }
            : timer
        ),
        history: [...state.history, historyEntry],
        showCompletionModal: true,
        completedTimerName: completedTimer.name,
      };

    case START_CATEGORY:
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.category === action.payload && timer.status !== "Completed"
            ? { ...timer, status: "Running" }
            : timer
        ),
      };

    case PAUSE_CATEGORY:
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.category === action.payload && timer.status === "Running"
            ? { ...timer, status: "Paused" }
            : timer
        ),
      };

    case RESET_CATEGORY:
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.category === action.payload
            ? { ...timer, remainingTime: timer.duration, status: "Paused" }
            : timer
        ),
      };

    case CLOSE_MODAL:
      return {
        ...state,
        showCompletionModal: false,
        completedTimerName: "",
      };

    case LOAD_DATA:
      return {
        ...state,
        timers: action.payload.timers || [],
        history: action.payload.history || [],
      };

    default:
      return state;
  }
};

export const TimerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  useEffect(() => {
    const loadData = async () => {
      const timers = await loadTimers();
      const history = await loadHistory();

      dispatch({ type: LOAD_DATA, payload: { timers, history } });
    };

    loadData();
  }, []);

  useEffect(() => {
    saveTimers(state.timers);
  }, [state.timers]);

  useEffect(() => {
    saveHistory(state.history);
  }, [state.history]);

  useEffect(() => {
    const interval = setInterval(() => {
      state.timers.forEach((timer) => {
        if (timer.status === "Running" && timer.remainingTime > 0) {
          dispatch({
            type: UPDATE_TIMER,
            payload: {
              id: timer.id, // Ensure correct payload structure
              remainingTime: timer.remainingTime - 1,
            },
          });
        }

        if (
          timer.halfwayAlert &&
          timer.remainingTime === Math.floor(timer.duration / 2)
        ) {
          alert(`Halfway point reached for ${timer.name}`);
        }

        if (timer.remainingTime === 0) {
          // Fix condition for timer completion
          dispatch({ type: COMPLETE_TIMER, payload: timer.id });
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.timers]);

  const addTimer = (timer) => {
    dispatch({ type: ADD_TIMER, payload: timer });
  };

  const startTimer = (id) => {
    dispatch({ type: START_TIMER, payload: id });
  };

  const pauseTimer = (id) => {
    dispatch({ type: PAUSE_TIMER, payload: id });
  };

  const resetTimer = (id) => {
    dispatch({ type: RESET_TIMER, payload: id });
  };

  const startCategory = (category) => {
    dispatch({ type: START_CATEGORY, payload: category });
  };

  const pauseCategory = (category) => {
    dispatch({ type: PAUSE_CATEGORY, payload: category });
  };

  const resetCategory = (category) => {
    dispatch({ type: RESET_CATEGORY, payload: category });
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  return (
    <TimerContext.Provider
      value={{
        timers: state.timers,
        history: state.history,
        showCompletionModal: state.showCompletionModal,
        completedTimerName: state.completedTimerName,
        addTimer,
        startTimer,
        pauseTimer,
        resetTimer,
        startCategory,
        pauseCategory,
        resetCategory,
        closeModal,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = () => useContext(TimerContext);
