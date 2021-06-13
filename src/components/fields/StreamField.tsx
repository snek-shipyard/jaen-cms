import {AppstoreAddOutlined} from '@ant-design/icons'
import {Menu, Row, Button, Col, Dropdown, Divider} from 'antd'
import React, {useEffect, useState, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useCMSPageContext} from '~/contexts/context'
import {store} from '~/types'

import {GenericBC} from '~/components/blocks'

import {registerField} from '~/store/cmsActions'

type StreamFieldProps = {
  name: string
  blocks: GenericBC[]
  reverseOrder?: boolean
}

const StreamField: React.FC<StreamFieldProps> = ({
  name,
  blocks,
  reverseOrder
}) => {
  const context = useCMSPageContext()
  const dispatch = useDispatch<store.AppDispatch>()

  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref && ref.current) {
      setHeight(ref.current.clientHeight)
      setWidth(ref.current.clientWidth)
    }
  })

  let storeWorkingBlocks = useSelector(
    ({cms}: store.RootState) =>
      cms.dataLayer.working.pages[context.page.slug]?.fields[name]?.blocks
  )

  let storeBlocks = useSelector(
    ({cms}: store.RootState) =>
      cms.dataLayer.editing.pages[context.page.slug]?.fields[name]?.blocks
  )

  if (!storeBlocks) {
    storeBlocks = storeWorkingBlocks
  }

  const blocksKeys = Object.keys(storeBlocks || {}).sort(
    (a, b) => parseInt(a) - parseInt(b)
  )

  const getBlockComponentByTypeName = (typeName: string) =>
    blocks.find(b => b.BlockType === typeName)

  const renderBlock = (position: number) => {
    const blockTypeName = storeBlocks?.[position].typeName

    if (blockTypeName) {
      const Block = getBlockComponentByTypeName(blockTypeName)

      return (
        <>
          {Block ? (
            <Block
              streamFieldHeight={height}
              streamFieldWidth={width}
              key={position}
              fieldOptions={{
                fieldName: name,
                block: {position, typeName: Block.BlockType}
              }}
            />
          ) : null}
        </>
      )
    }
  }

  const addNewBlock = (typeName: string) =>
    dispatch(
      registerField({
        page: context.page,
        fieldOptions: {
          fieldName: name,
          block: {
            position: reverseOrder ? blocksKeys.length : -blocksKeys.length,
            typeName: typeName
          }
        }
      })
    )

  const blocksTypes = blocks.map(block => block.BlockType)

  const menu = (
    <Menu
      onClick={(value: any) => {
        addNewBlock(blocksTypes[value.key])
      }}>
      {blocksTypes.map((typeName, key) => (
        <>
          <Menu.Item key={key}>{typeName}</Menu.Item>
        </>
      ))}
    </Menu>
  )

  const button = (
    <Row justify="center">
      {blocksTypes.length > 0 ? (
        <Dropdown.Button
          type="primary"
          icon={<AppstoreAddOutlined />}
          overlay={menu}
        />
      ) : (
        <Button
          type="primary"
          icon={<AppstoreAddOutlined />}
          onClick={() => addNewBlock(blocksTypes[0])}
        />
      )}
    </Row>
  )

  return (
    <div ref={ref}>
      {!reverseOrder && (
        <>
          {button}
          <Divider orientation="left" />
        </>
      )}
      {storeBlocks && (
        <Row>
          <Col>
            {blocksKeys.map(position => renderBlock(parseInt(position)))}
          </Col>
        </Row>
      )}
      {reverseOrder && (
        <>
          <Divider orientation="left" />
          {button}
        </>
      )}
    </div>
  )
}

export default StreamField

// const storePageData: {
//   fields: {
//     [name: string]: {
//       blocks: {
//         [position: string]: {
//           typeName: string
//           fields: {[name: string]: number | string | boolean}
//         }
//       }
//     }
//   }
// } = {
//   fields: {
//     timeline: {
//       blocks: {
//         0: {
//           typeName: 'TimelineBlock',
//           fields: {
//             date: '20.10.2001',
//             heading: 'Welcome',
//             body: '<b>bold body</b>'
//           }
//         }
//       }
//     }
//   }
// }