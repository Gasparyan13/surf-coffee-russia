import React, { useState } from 'react'

import { SvgLogoutIcon } from '@common/IconComponents/SvgLogoutIcon'

import { logout } from '@helpers'

import { Button, Dialog } from '@uiKit'
import { Props as ButtonProps } from '@uiKit/components/Dialog/components/DialogButton'

export const ButtonLogout: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const approveLogout: ButtonProps = {
    onClick: logout,
    text: 'Выйти',
    isVisible: true,
  }

  const cancelLogout: ButtonProps = {
    onClick: () => setIsOpen(false),
    text: 'Назад',
    isVisible: true,
    color: 'secondary',
  }

  return (
    <>
      <Button
        color="secondary"
        size="large"
        startIcon={<SvgLogoutIcon />}
        variant="contained"
        onClick={() => setIsOpen(true)}>
        Выход
      </Button>
      <Dialog
        cancelButton={cancelLogout}
        isOpen={isOpen}
        successButton={approveLogout}
        title="Выйти из аккаунта?"
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
