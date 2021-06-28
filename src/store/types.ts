/**
 * @license
 * Copyright snek. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */

export type {RootState, AppDispatch} from './index'

export type CMSSettings = {gitRemote?: string}

export type PageIndex = {
  rootPageSlug?: string
  pages: {
    [slug: string]: {
      slug: string
      title: string
      typeName: string
      childSlugs: string[]
    }
  }
}

export type DataLayer = {
  pages: {
    [slug: string]: {
      typeName: string
      fields: {
        [name: string]: {
          content?: string
          blocks?: {
            [position: string]: {
              typeName: string
              fields: {
                [name: string]: string | undefined
              }
            }
          }
        }
      }
      hiddenChildSlugs: string[]
    }
  }
  index: PageIndex
}

export interface CMSOptions {
  editing: boolean
  showMenu: boolean
}
export interface CMSState {
  settings: CMSSettings
  options: CMSOptions
  dataLayer: {
    origCksm?: string
    working: DataLayer & {updateFieldsCount: number}
    editing: DataLayer
  }
}

export interface AuthState {
  authenticated: boolean
}

export interface NotifyState {
  error: {
    message: string
    description: string
  } | null
}
