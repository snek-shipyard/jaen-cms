/**
 * @license
 *
 * SPDX-License-Identifier: EUPL-1.2
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */

const path = require(`path`)

module.exports = {
  webpack: {
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  }
}
