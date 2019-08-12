/**
 * Copyright 2018-present Facebook.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * @format
 * @flow strict-local
 */

import {useEffect, useState} from 'react';
import {parameterIsNumberType} from '../util/uri';

const validateParameter = (value: string, parameter: string) => {
  return (
    value.length > 0 &&
    (parameterIsNumberType(parameter) ? !isNaN(parseInt(value, 10)) : true)
  );
};

export const useRequiredParameterFormValidator = (
  requiredParameters: Array<string>,
) => {
  const [values, setValuesArray] = useState<Array<string>>(
    requiredParameters.map(() => ''),
  );
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    if (requiredParameters.length != values.length) {
      setValuesArray(requiredParameters.map(() => ''));
    }
    if (
      values.every((value, idx) =>
        validateParameter(value, requiredParameters[idx]),
      )
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  });
  return [isValid, values, setValuesArray];
};
