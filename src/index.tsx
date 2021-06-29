import {Card} from 'antd'
import ReactDOM from 'react-dom'

import './cms.scss'
import {
  ConnectedPageType,
  CMSProvider,
  EditableField,
  SimpleTextField,
  RichTextField,
  IndexField,
  StreamField,
  BC,
  prepareBlocks
} from './root'

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

const HomePage: ConnectedPageType = () => {
  return (
    <>
      <h1>test</h1>
      <SimpleTextField name="testfield" />
      <EditableField
        fieldOptions={{
          fieldName: 'f1',
          block: {typeName: 'TestBlock', position: 0, blockFieldName: 'h1'}
        }}
      />
      <EditableField
        fieldOptions={{
          fieldName: 'f1',
          block: {typeName: 'TestBlock', position: 0, blockFieldName: 'h2'}
        }}
      />
      <EditableField
        fieldOptions={{
          fieldName: 'f2',
          block: {typeName: 'TestBlock', position: 0, blockFieldName: 'h1'}
        }}
      />
      <EditableField
        fieldOptions={{
          fieldName: 'f2',
          block: {typeName: 'TestBlock', position: 0, blockFieldName: 'h2'}
        }}
      />
      <IndexField
        fixedSlug={'home'}
        outerElement={() => <div />}
        renderItem={(item, key, navigate) => (
          <p key={key}>
            Slug: {item.slug} Title: {item.title}{' '}
            <a onClick={() => navigate()}>Goto</a>
          </p>
        )}
      />
      <Card style={{width: '50%', display: 'table'}}>
        <StreamField
          reverseOrder={false}
          name={'timeline'}
          blocks={[CardBlock]}
        />
      </Card>
    </>
  )
}

HomePage.PageType = 'HomePage'
HomePage.ChildPages = [HomePage]

ReactDOM.render(
  <CMSProvider
    settings={{gitRemote: 'snek-shipyard/jaen-demo'}}
    pages={[HomePage]}
  />,
  document.getElementById('root')
)
