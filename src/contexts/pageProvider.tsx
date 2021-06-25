import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {CMSPageContext} from '~/contexts/context'
import {store, PageParamsType} from '~/types'

import {setHiddenChildSlugs as setHiddenChildSlugsAction} from '~/store/actions/cms'

interface IConnectedPageType {
  PageType: string
  ChildPages: ConnectedPageType[]
}

export type ConnectedPageType = React.FC<{slug: string}> & IConnectedPageType

type PageProviderProps = PageParamsType

const PageProvider: React.FC<PageProviderProps> = React.memo(
  ({children, slug, typeName}) => {
    const dispatch = useDispatch<store.AppDispatch>()

    const [page, _setPage] = useState<PageParamsType>({slug, typeName})

    const setHiddenChildSlugs = (hiddenChildSlugs: string[]) =>
      dispatch(setHiddenChildSlugsAction({page, hiddenChildSlugs}))

    const index = useSelector(({cms}: store.RootState) => cms.index)

    const getChildPagesFromIndex = (fixedSlug?: string) => {
      const slug = fixedSlug || page.slug
      return (
        index?.pages[slug]?.childSlugs.map(
          childSlug => index.pages[childSlug]
        ) || []
      )
    }

    const editingHiddenSlugs = useSelector(
      ({cms}: store.RootState) =>
        cms.dataLayer.editing.pages[page.slug]?.hiddenChildSlugs
    )
    const workingHiddenSlugs = useSelector(
      ({cms}: store.RootState) =>
        cms.dataLayer.working.pages[page.slug]?.hiddenChildSlugs
    )

    const getHiddenSlugs = () => {
      return editingHiddenSlugs
        ? editingHiddenSlugs || []
        : workingHiddenSlugs || []
    }

    useEffect(() => {
      document.title = index?.pages[page.slug]?.title || document.title
    }, [page])

    return (
      <CMSPageContext.Provider
        value={{
          page,
          getChildPagesFromIndex,
          getHiddenSlugs,
          setHiddenChildSlugs
        }}>
        {children}
      </CMSPageContext.Provider>
    )
  }
)

export default PageProvider
