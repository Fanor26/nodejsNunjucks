import { debugLog } from '../debug.js';

// Sistema de gestión de hooks
const createHooksSystem = () => {
  let currentInstance = null;
  let currentHookIndex = 0;
  let pendingEffects = [];

  const resetHookSystem = () => {
    currentHookIndex = 0;
  };

  const useState = (initialValue) => {
    const hookIndex = currentHookIndex++;
    const instance = currentInstance;

    if (!instance._hooks[hookIndex]) {
      instance._hooks[hookIndex] = {
        value:
          typeof initialValue === 'function' ? initialValue() : initialValue,
        subscribers: new Set(),
      };
    }

    const hook = instance._hooks[hookIndex];

    const setState = (action) => {
      const newValue =
        typeof action === 'function' ? action(hook.value) : action;

      if (!Object.is(hook.value, newValue)) {
        hook.value = newValue;
        hook.subscribers.forEach((cb) => cb());
        instance._needsUpdate = true;

        // 🔽 Forzar renderizado después de actualizar el estado
        instance.forceRender();
      }
    };

    hook.subscribers.add(instance._update);
    return [hook.value, setState];
  };

  const useEffect = (effect, deps) => {
    const hookIndex = currentHookIndex++;
    const instance = currentInstance;

    if (!instance._hooks[hookIndex]) {
      instance._hooks[hookIndex] = { lastDeps: undefined, cleanup: undefined };
    }

    const hook = instance._hooks[hookIndex];
    const hasChanged =
      !deps ||
      !hook.lastDeps ||
      deps.some((dep, i) => !Object.is(dep, hook.lastDeps[i]));

    if (hasChanged) {
      pendingEffects.push(() => {
        if (hook.cleanup) hook.cleanup();
        hook.cleanup = effect();
      });
      hook.lastDeps = deps;
    }
  };

  const withHooks = (render) => {
    return (props) => {
      const instance = {
        _hooks: [],
        _needsUpdate: false,

        _update: () => {
          resetHookSystem();
          currentInstance = instance;
          const result = render(props);
          currentInstance = null;

          // Ejecutar efectos después de renderizar
          while (pendingEffects.length) {
            const effect = pendingEffects.shift();
            try {
              effect();
            } catch (e) {
              debugLog('Effect error:', e);
            }
          }

          return result;
        },

        // 🔽 Forzar renderización manual (se llama en setState)
        forceRender: () => {
          instance._update();
        },
      };

      return instance._update();
    };
  };

  return { useState, useEffect, withHooks };
};

// Exportar instancia singleton
const hooks = createHooksSystem();
export const { useState, useEffect, withHooks } = hooks;
