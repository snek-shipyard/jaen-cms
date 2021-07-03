/**
 * @license
 * Copyright snek-at. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {createAction} from '@reduxjs/toolkit'

export const setError =
  createAction<{message: string; description: string}>('error/setError')
export const hideError = createAction('error/hideError')

export default {setError, hideError}
