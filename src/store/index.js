import { createStore, applyMiddleware } from 'redux';
import enhance from './enhance';
import middlewares from './middlewares';
import rootReducer from '../modules';
import { saveStore, loadStore } from '../utils/storage';

export default function configureStore(initialState) {
  const preloadedState = { ...initialState, ...loadStore() };
  const enhancers = enhance(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, preloadedState, enhancers);

  if (module.hot) {
    module.hot.accept('../modules', () => {
      store.replaceReducer(rootReducer);
    });
  }

  store.subscribe(() => {
    saveStore(store.getState());
  });

  return store;
}
