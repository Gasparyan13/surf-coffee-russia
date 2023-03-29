import { ComponentMeta } from '@storybook/react'
import React, { useMemo, useState } from 'react'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { Button } from '../../Button'
import { Drawer } from '../Drawer'
import * as T from '../Drawer.types'

const WithState = (props: T.Props) => {
  const [open, setOpen] = useState(true)

  const handleToggle = () => setOpen((prev) => !prev)

  const extendedProps = useMemo(() => {
    let newProps = {
      ...props,
    }

    if (newProps.headerProps?.backButtonProps) {
      newProps = {
        ...newProps,
        headerProps: {
          ...newProps.headerProps,
          backButtonProps: {
            ...newProps.headerProps.backButtonProps,
            onClick: handleToggle,
          },
        },
      }
    }

    if (newProps.headerProps?.closeButtonProps) {
      newProps = {
        ...newProps,
        headerProps: {
          ...newProps.headerProps,
          closeButtonProps: {
            ...newProps.headerProps.closeButtonProps,
            onClick: handleToggle,
          },
        },
      }
    }

    if (newProps.footerProps?.cancelButtonProps) {
      newProps = {
        ...newProps,
        footerProps: {
          ...newProps.footerProps,
          cancelButtonProps: {
            ...newProps.footerProps.cancelButtonProps,
            onClick: handleToggle,
          },
        },
      }
    }

    return newProps
  }, [props])

  return (
    <>
      <Button color="primary" onClick={handleToggle}>
        Open
      </Button>
      <Drawer {...extendedProps} open={open} onClose={handleToggle} />
    </>
  )
}

export const Template = makeStoryTemplate(WithState)

export const storyBookConfig = {
  component: Drawer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Drawer>

const defaultArgs: Partial<T.Props> = {
  children: 'custom content',
  headerProps: {
    title: 'Header',
  },
}

const footerDefaultArgs: Partial<T.Props> = {
  footerProps: {
    successButtonProps: {
      children: 'Сохранить',
    },
    cancelButtonProps: {
      children: 'Отменить',
    },
  },
}

const headerBackButtonArgs: Partial<T.Props> = {
  headerProps: {
    title: 'Header',
    backButtonProps: {
      onClick: () => {},
    },
  },
}

const headerCloseButtonArgs: Partial<T.Props> = {
  headerProps: {
    title: 'Header',
    date: '2022-01-12',
    closeButtonProps: {
      onClick: () => {},
    },
  },
}

const footerSubmitButtonOnlyArgs: Partial<T.Props> = {
  footerProps: {
    successButtonProps: {
      children: 'Сохранить',
    },
  },
}

const footerCancelButtonOnlyArgs: Partial<T.Props> = {
  footerProps: {
    cancelButtonProps: {
      children: 'Отменить',
    },
  },
}

const footerCustomContentOnlyArgs: Partial<T.Props> = {
  footerProps: {
    content: 'custom footer content',
  },
}

export const stories = {
  Template,
  defaultArgs,
  footerDefaultArgs,
  headerBackButtonArgs,
  headerCloseButtonArgs,
  footerSubmitButtonOnlyArgs,
  footerCancelButtonOnlyArgs,
  footerCustomContentOnlyArgs,
}
