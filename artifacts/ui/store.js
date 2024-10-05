import { applyMiddleware, createStore } from 'redux';
//import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { reducers } from "./reducers";
import rootSaga from "./saga";
import { allMiddlewares } from "./navigation";
import { createLogger } from 'redux-logger';
const logger = createLogger({});
//
import { composeWithDevTools } from 'remote-redux-devtools';
// Middleware
const sagaMiddleware = createSagaMiddleware();
export const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware, ...allMiddlewares, logger)));
sagaMiddleware.run(rootSaga);
if (module.hot) {
    // Enable hot module replacement for reducers
    module.hot.accept(() => {
        const nextRootReducer = require('./reducers').reducers;
        store.replaceReducer(nextRootReducer);
    });
}
//# sourceMappingURL=store.js.map