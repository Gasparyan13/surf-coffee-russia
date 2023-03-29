import { Grid, GridSize } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router'

import { AppLoader } from '@app/containers/AppLoader'

import { SvgPlusIcon } from '@common/IconComponents/SvgPlusIcon'
import { changeSVGHoverColor, mb, mr } from '@common/common.styled'

import { Button, Typography } from '@uiKit'

import { useLazyGetEnterpriseWorkersQuery } from '@rtkApi/modules/__generated__/enterprise'

import { getManagerCurrentProjectId } from '@store/deprecated/modules/app/selectors'

import { WorkerEmployeeProvider } from '../../containers/WorkersEmployeeCtx'
import { DialogAddEmployee } from '../DialogAddEmployee'
import * as Styled from './StaffLayout.styled'

export const StaffLayout: React.FC = () => {
  const enterpriseId: number | undefined = useSelector(
    getManagerCurrentProjectId,
  )
  const [employeeId, setEmployeeId] = useState<number | undefined>(0)
  const [showCreateEmployee, setShowCreateEmployee] = useState(false)

  const [
    apiGetWorkers,
    {
      data: workersData,
      isLoading: isLoadingGetWorkers,
      isFetching: isFetchingTable,
    },
  ] = useLazyGetEnterpriseWorkersQuery()

  const handleOpenModal = useCallback(() => {
    setShowCreateEmployee(true)
  }, [])

  const handleRefetchWorkers = useCallback(async () => {
    await apiGetWorkers({ enterpriseId: enterpriseId! })
  }, [apiGetWorkers, enterpriseId])

  useEffect(() => {
    if (enterpriseId) {
      handleRefetchWorkers()
    }
  }, [enterpriseId, handleRefetchWorkers])

  return (
    <WorkerEmployeeProvider
      value={{ employeeId, setEmployeeId, isFetchingTable }}>
      <Styled.Root>
        <Styled.Header>
          <Grid container>
            <Grid item xs={12}>
              <Grid container gap={6} justifyContent="space-between">
                <Typography css={mb(32)} variant="H2">
                  Персонал
                </Typography>
                <Grid item xs={3.32 as GridSize}>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Button
                        color="secondary"
                        css={changeSVGHoverColor}
                        size="large"
                        startIcon={<SvgPlusIcon css={mr(10)} />}
                        variant="contained"
                        onClick={handleOpenModal}>
                        Добавить сотрудника
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Styled.Header>
        <Styled.Content>
          {isLoadingGetWorkers ? (
            <AppLoader />
          ) : (
            <Outlet
              context={{
                workersData,
                onOpenModal: handleOpenModal,
              }}
            />
          )}
        </Styled.Content>
        <DialogAddEmployee
          isOpenCreateEmployee={showCreateEmployee}
          setModal={setShowCreateEmployee}
          onRefetch={handleRefetchWorkers}
        />
      </Styled.Root>
    </WorkerEmployeeProvider>
  )
}
