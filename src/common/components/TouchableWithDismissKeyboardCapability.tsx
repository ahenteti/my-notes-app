import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

export const TouchableWithDismissKeyboardCapability = ({ children }: any) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);
