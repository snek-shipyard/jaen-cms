import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import './cms.scss'
import StreamField from './components/fields/StreamField'
import {
  ConnectedPageType,
  CMSProvider,
  PageProvider,
  EditableField,
  RichTextField,
  BC,
  prepareBlocks
} from './root'
import {persistor, store} from './store/store'

type TestBlockFields = {name: 'test'; name2: 'test2'}

export const TestBlock: BC<TestBlockFields> = ({fieldOptions}) => {
  return (
    <>
      <div style={{backgroundColor: 'InfoBackground'}}>
        {prepareBlocks<TestBlockFields>(TestBlock, fieldOptions).map(
          ({ConfiguredField, blockFieldName}) => {
            switch (blockFieldName) {
              case 'name':
                return <h1>{ConfiguredField}</h1>

              case 'name2':
                return <h2>{ConfiguredField}</h2>

              default:
                return {ConfiguredField}
            }
          }
        )}
      </div>
    </>
  )
}

TestBlock.BlockType = 'TimelineBlock'
TestBlock.BlockFields = {
  name: EditableField,
  name2: RichTextField
}

const HomePage: ConnectedPageType = ({slug}) => {
  return (
    <>
      <PageProvider typeName={HomePage.PageType} slug={slug}>
        {/* <TextField fieldOptions={{name: 'testfield'}} />
        <TextField
          fieldOptions={{
            name: 'testfield2',
            block: {position: 0, typeName: 'heading'}
          }}
        />
        <IndexField
          outerElement={() => <div />}
          renderItem={(item, key, navigate) => (
            <p key={key}>
              Slug: {item.slug} Title: {item.title}{' '}
              <a onClick={() => navigate()}>Goto</a>
            </p>
          )}
        /> */}
        <StreamField name={'timeline'} blocks={[TestBlock]} />
      </PageProvider>
    </>
  )
}

HomePage.PageType = 'HomePage'
HomePage.ChildPages = [HomePage]

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <PersistGate loading={null} persistor={persistor}>
        <CMSProvider
          settings={{gitRemote: 'snek-shipyard/jaen-demo'}}
          pages={[HomePage]}
        />
      </PersistGate>
    </React.StrictMode>
  </Provider>,

  document.getElementById('root')
)
