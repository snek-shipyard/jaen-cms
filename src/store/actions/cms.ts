/**
 * @license
 * Copyright snek. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {createAction, createAsyncThunk} from '@reduxjs/toolkit'
import deepmerge from 'deepmerge'
import BridgeDrop from 'drop'
import {components, PageParamsType} from '~/types'

import {PageNode} from '~/components/Explorer/index'
import {BlockFieldOptions} from '~/components/blocks/index'

import {DataLayer, PageIndex, CMSSettings} from '../types'

export const setSettings = createAction<CMSSettings>('cms/setSettings')

export const registerField = createAction<{
  fieldOptions: BlockFieldOptions
  page: PageParamsType
}>('cms/registerField')
export const unregisterField = createAction<{
  fieldOptions: BlockFieldOptions
  page: PageParamsType
}>('cms/unregisterField')

export const toggleMenu = createAction<boolean>('cms/toggleMenu')

export const overrideWDL =
  createAction<{data: DataLayer; cksm: string}>('cms/overrideWDL')

export const toggleEditing = createAction<boolean>('cms/toggleEditing')
export const discardEditing = createAction('cms/discardEditing')

export const updatePageContent = createAction<{
  content: string
  fieldOptions: components.EditableFieldOptions
  page: PageParamsType
}>('cms/updatePageContent')

export const setIndex = createAction<PageIndex>('cms/setIndex')

export const transferPageToIndex = createAction<{
  page: PageNode
  index: PageIndex
}>('cms/transferPageToIndex')
export const deletePageFromIndex = createAction<{
  page: PageNode
  index: PageIndex
}>('cms/deletePageFromIndex')

export const setHiddenChildSlugs = createAction<{
  page: PageParamsType
  hiddenChildSlugs: string[]
}>('cms/setHiddenChildSlugs')

export const publish = createAsyncThunk<DataLayer, void, {}>(
  'cms/publish',
  async (_, thunkAPI) => {
    try {
      let {settings, dataLayer, index} = (thunkAPI.getState() as any).cms

      const {gitRemote} = settings

      if (!gitRemote) {
        throw new Error(
          `DropAPI publish failed. Settings does not include gitRemote`
        )
      }

      const workingLayer = deepmerge<any>(dataLayer.working, dataLayer.editing)

      const publishData = JSON.stringify({
        dataLayer: {working: workingLayer},
        index
      })

      const {data, errors} =
        await BridgeDrop.buildIn.mutations.doJaenPublishFormPageMutation({
          url: '/jaen-publish',
          values: {git_remote: gitRemote, jaen_data: publishData}
        })

      if (!data?.jaenPublishFormPage || errors) {
        throw new Error(`DropAPI publish failed`)
      }

      return workingLayer
    } catch (err) {
      console.error(err)
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)