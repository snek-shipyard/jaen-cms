import 'antd/dist/antd.css'

export type {BC, ConnectedPageType} from '~/types'

export {prepareBlocks} from './components/blocks'
export {
  EditableField,
  RichTextField,
  SimpleTextField,
  SimpleRichTextField,
  IndexField
} from './components/fields'
export {CMSProvider, PageProvider} from './contexts'
