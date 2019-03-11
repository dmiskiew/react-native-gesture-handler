<<<<<<< HEAD
import React from 'react';
=======
import React, { useImperativeHandle, useRef } from 'react';
import { findNodeHandle } from 'react-native';
>>>>>>> 8ccb345... cleanup

import NativeViewGestureHandler from './NativeViewGestureHandler';

/*
 * This array should consist of:
 *   - All keys in propTypes from NativeGestureHandler
 *     (and all keys in GestureHandlerPropTypes)
 *   - 'onGestureHandlerEvent'
 *   - 'onGestureHandlerStateChange'
 */
const NATIVE_WRAPPER_PROPS_FILTER = [
  'id',
  'minPointers',
  'enabled',
  'waitFor',
  'simultaneousHandlers',
  'shouldCancelWhenOutside',
  'hitSlop',
  'onGestureEvent',
  'onHandlerStateChange',
  'onBegan',
  'onFailed',
  'onCancelled',
  'onActivated',
  'onEnded',
  'shouldActivateOnStart',
  'disallowInterruption',
  'onGestureHandlerEvent',
  'onGestureHandlerStateChange',
];

export default function createNativeWrapper(Component, config = {}) {
  const ComponentWrapper = React.forwardRef((props, ref) => {
    // filter out props that should be passed to gesture handler wrapper
    const gestureHandlerProps = Object.keys(props).reduce(
      (res, key) => {
        if (NATIVE_WRAPPER_PROPS_FILTER.indexOf(key) !== -1) {
          res[key] = props[key];
        }
        return res;
      },
      { ...config } // watch out not to modify config
    );
    
    const _ref = useRef();
    const _gestureHandlerRef = useRef();
    useImperativeHandle(ref, () => {
      const node = _gestureHandlerRef.current;
      // add handlerTag for relations config
      if (_ref.current && node) {
        _ref.current._handlerTag = node._handlerTag;
        return _ref.current;
      }
      return null;
    }, [_ref, _gestureHandlerRef]);
    
    return (
      <NativeViewGestureHandler {...gestureHandlerProps}>
        <Component {...props} ref={ref} />
      </NativeViewGestureHandler>
    );
  });

  ComponentWrapper.propTypes = {
    ...Component.propTypes,
  };
  ComponentWrapper.displayName = Component.displayName || 'ComponentWrapper';

    _gestureRefHandler = node => {
      this._handlerTag = node ? node._handlerTag : null;
    }

    render() {
      // filter out props that should be passed to gesture handler wrapper
      const gestureHandlerProps = Object.keys(this.props).reduce(
        (props, key) => {
          if (NATIVE_WRAPPER_PROPS_FILTER.indexOf(key) !== -1) {
            props[key] = this.props[key];
          }
          return props;
        },
        { ...config } // watch out not to modify config
      );
      return (
        <NativeViewGestureHandler {...gestureHandlerProps} ref={this._gestureRefHandler}>
          <Component {...this.props} ref={this._refHandler} />
        </NativeViewGestureHandler>
      );
    }
  }

  return ComponentWrapper;
}
