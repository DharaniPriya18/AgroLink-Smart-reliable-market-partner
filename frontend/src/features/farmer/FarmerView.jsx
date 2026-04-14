import FarmerApplySection from './sections/FarmerApplySection.jsx'
import FarmerCropsSection from './sections/FarmerCropsSection.jsx'
import FarmerOverviewSection from './sections/FarmerOverviewSection.jsx'
import FarmerSignalsSection from './sections/FarmerSignalsSection.jsx'
import FarmerSubmissionsSection from './sections/FarmerSubmissionsSection.jsx'
import FarmerAIAdvisorSection from './sections/FarmerAIAdvisorSection.jsx'

function FarmerView(props) {
  const { activeSection } = props

  if (activeSection === 'overview') return <FarmerOverviewSection {...props} />
  if (activeSection === 'myCrops') return <FarmerCropsSection {...props} />
  if (activeSection === 'demandSignals') return <FarmerSignalsSection {...props} />
  if (activeSection === 'applyToSupply') return <FarmerApplySection {...props} />
  if (activeSection === 'aiAdvisor') return <FarmerAIAdvisorSection {...props} />
  return <FarmerSubmissionsSection {...props} />
}

export default FarmerView
