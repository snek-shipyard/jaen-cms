import {Card} from 'antd'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import './cms.scss'
// import StreamField from './components/fields/StreamField';
import {
  ConnectedPageType,
  CMSProvider,
  PageProvider,
  EditableField,
  SimpleTextField,
  RichTextField,
  StreamField,
  BC,
  prepareBlocks
} from './root'
import {persistor, store} from './store/store'

type TestBlockFields = {name: 'test'; name2: 'test2'}

export const TestBlock: BC<TestBlockFields> = ({fieldOptions}) => {
  const blocks = prepareBlocks<TestBlockFields>(TestBlock, fieldOptions)

  return (
    <>
      {(Object.keys(blocks) as (keyof typeof blocks)[]).map(
        (blockFieldName, key) => {
          const ConfiguredField = blocks[blockFieldName]

          console.log(ConfiguredField)

          switch (blockFieldName) {
            case 'name':
              return <h1 key={key}>{ConfiguredField}</h1>

            case 'name2':
              return <>{ConfiguredField}</>

            default:
              return <>{ConfiguredField}</>
          }
        }
      )}
    </>
  )
}

TestBlock.BlockType = 'TimelineBlock'
TestBlock.BlockFields = {
  name: EditableField,
  name2: RichTextField
}

type CardBlockType = {title: string; extra: string; text: string}

export const CardBlock: BC<CardBlockType> = ({
  fieldOptions,
  streamFieldWidth
}) => {
  const blocks = prepareBlocks<CardBlockType>(CardBlock, fieldOptions)

  return (
    <>
      <Card
        type="inner"
        title={blocks['title']}
        style={{width: streamFieldWidth}}
        extra={<a href="#">{blocks['extra']}</a>}>
        {blocks['text']}
        {'test123'}
      </Card>
    </>
  )
}

CardBlock.BlockType = 'CardBlock'
CardBlock.BlockFields = {
  title: EditableField,
  extra: EditableField,
  text: RichTextField
}

const HomePage: ConnectedPageType = ({slug}) => {
  return (
    <>
      <PageProvider typeName={HomePage.PageType} slug={slug}>
        <SimpleTextField name={'testfield'} />
        <SimpleTextField name={'testfield2'} />

        <EditableField
          fieldOptions={{
            fieldName: 'editableField',
            block: {
              position: 0,
              typeName: 'TestBlock',
              blockFieldName: 'heading1'
            }
          }}
        />
        <EditableField
          fieldOptions={{
            fieldName: 'editableField',
            block: {
              position: 0,
              typeName: 'TestBlock',
              blockFieldName: 'heading2'
            }
          }}
        />
        <EditableField
          fieldOptions={{
            fieldName: 'editableField',
            block: {
              position: 0,
              typeName: 'TestBlock',
              blockFieldName: 'heading3'
            }
          }}
        />
        <EditableField
          fieldOptions={{
            fieldName: 'editableField',
            block: {
              position: 0,
              typeName: 'TestBlock',
              blockFieldName: 'heading4'
            }
          }}
        />
        {/* <TextField
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

        <Card style={{width: '50%', display: 'table'}}>
          <StreamField
            reverseOrder={false}
            name={'timeline'}
            blocks={[CardBlock, TestBlock]}
          />
        </Card>
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
