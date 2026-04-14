import IncomingApplicationsSection from './sections/IncomingApplicationsSection.jsx'
import IntermediaryOverviewSection from './sections/IntermediaryOverviewSection.jsx'
import LogisticsSection from './sections/LogisticsSection.jsx'
import PerformanceSection from './sections/PerformanceSection.jsx'
import SupplyMapSection from './sections/SupplyMapSection.jsx'

function IntermediaryView(props) {
  const { activeSection } = props

  if (activeSection === 'overview') return <IntermediaryOverviewSection {...props} />
  if (activeSection === 'incomingApplications') return <IncomingApplicationsSection {...props} />
  if (activeSection === 'activeSupplyMap') return <SupplyMapSection {...props} />
  if (activeSection === 'logistics') return <LogisticsSection {...props} />
  return <PerformanceSection {...props} />
}

export default IntermediaryView
