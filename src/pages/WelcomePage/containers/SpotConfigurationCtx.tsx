import { createCtx } from '@helpers/createCtx'

import { SpotWizardContextViewDto } from '@rtkApi/modules/__generated__/spot_config'

export const [useSpotConfigurationCtx, SpotConfigurationProvider] = createCtx<{
  wizardContext: SpotWizardContextViewDto
  onGoNext: (arg: SpotWizardContextViewDto) => void
  isLoading: boolean
}>()
