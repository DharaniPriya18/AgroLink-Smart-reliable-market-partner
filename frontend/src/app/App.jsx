import { useMemo, useState } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout.jsx'
import { copy } from '../data/copy.js'
import {
  farmerSections,
  initialApplications,
  initialFarmerCrops,
  intermediarySections,
} from '../data/mockData.js'
import LoginScreen from '../features/auth/LoginScreen.jsx'
import FarmerView from '../features/farmer/FarmerView.jsx'
import IntermediaryView from '../features/intermediary/IntermediaryView.jsx'

function App() {
  const [language, setLanguage] = useState('en')
  const [role, setRole] = useState(null)
  const [activeSection, setActiveSection] = useState('overview')
  const [selectedSignal, setSelectedSignal] = useState(null)
  const [offerQuantity, setOfferQuantity] = useState('')
  const [cropForm, setCropForm] = useState({ crop: '', quantity: '', district: '' })
  const [farmerCrops, setFarmerCrops] = useState(initialFarmerCrops)
  const [applications, setApplications] = useState(initialApplications)

  const t = copy[language]

  const logisticsApplications = useMemo(
    () => applications.filter((item) => ['Approved', 'In Transit', 'Delivered'].includes(item.status)),
    [applications],
  )

  const isFarmer = role === 'farmer'
  const sections = isFarmer ? farmerSections : intermediarySections
  const sectionLabel = t[activeSection] || t.overview

  const stats = isFarmer
    ? [
        { label: t.totalCrops, value: farmerCrops.length },
        { label: t.openRequests, value: applications.filter((item) => item.status === 'Pending').length },
        { label: t.applicationsCount, value: applications.length },
      ]
    : [
        { label: t.applicationsCount, value: applications.length },
        { label: t.supplyCoverage, value: '68%' },
        { label: t.activeLogistics, value: logisticsApplications.length },
      ]

  function enterRole(nextRole) {
    setRole(nextRole)
    setActiveSection('overview')
  }

  function handleSwitchRole() {
    setRole((current) => (current === 'farmer' ? 'intermediary' : 'farmer'))
    setActiveSection('overview')
  }

  function handleLogout() {
    setRole(null)
    setActiveSection('overview')
  }

  function handleAddCrop(event) {
    event.preventDefault()
    if (!cropForm.crop || !cropForm.quantity || !cropForm.district) return

    setFarmerCrops((current) => [
      {
        id: Date.now(),
        crop: cropForm.crop,
        quantity: Number(cropForm.quantity),
        district: cropForm.district,
      },
      ...current,
    ])
    setCropForm({ crop: '', quantity: '', district: '' })
  }

  function handleSubmitOffer(event) {
    event.preventDefault()
    if (!selectedSignal || !offerQuantity) return

    setApplications((current) => [
      {
        id: Date.now(),
        crop: selectedSignal.crop,
        quantity: Number(offerQuantity),
        district: farmerCrops[0]?.district || 'Erode',
        region: selectedSignal.region,
        trend: selectedSignal.trend,
        status: 'Pending',
      },
      ...current,
    ])
    setOfferQuantity('')
    setActiveSection('mySubmissions')
  }

  function updateApplicationStatus(id, status) {
    setApplications((current) => current.map((item) => (item.id === id ? { ...item, status } : item)))
  }

  function updateLogisticsStatus(id, status) {
    setApplications((current) => current.map((item) => (item.id === id ? { ...item, status } : item)))
  }

  if (!role) {
    return (
      <LoginScreen
        t={t}
        language={language}
        setLanguage={setLanguage}
        enterRole={enterRole}
      />
    )
  }

  const sidebarProps = {
    brand: t.brand,
    title: isFarmer ? t.dashboardFarmer : t.dashboardIntermediary,
    description: isFarmer ? t.farmerWelcome : t.intermediaryWelcome,
    sections,
    activeSection,
    setActiveSection,
    profileName: isFarmer ? t.profileFarmerName : t.profileIntermediaryName,
    profileRole: isFarmer ? t.profileFarmerRole : t.profileIntermediaryRole,
    profileInitial: isFarmer ? 'F' : 'I',
    language,
    setLanguage,
    onSwitchRole: handleSwitchRole,
    onLogout: handleLogout,
    t,
  }

  const topbarProps = {
    label: sectionLabel,
    title:
      activeSection === 'overview'
        ? isFarmer
          ? t.overviewFarmerTitle
          : t.overviewIntermediaryTitle
        : sectionLabel,
    description:
      activeSection === 'overview'
        ? isFarmer
          ? t.overviewFarmerText
          : t.overviewIntermediaryText
        : isFarmer
          ? t.farmerWelcome
          : t.intermediaryWelcome,
    stats,
  }

  return (
    <DashboardLayout
      themeClass={isFarmer ? 'farmer-theme' : 'intermediary-theme'}
      sidebar={sidebarProps}
      topbar={topbarProps}
    >
      {isFarmer ? (
        <FarmerView
          activeSection={activeSection}
          t={t}
          cropForm={cropForm}
          setCropForm={setCropForm}
          farmerCrops={farmerCrops}
          handleAddCrop={handleAddCrop}
          selectedSignal={selectedSignal}
          setSelectedSignal={setSelectedSignal}
          offerQuantity={offerQuantity}
          setOfferQuantity={setOfferQuantity}
          handleSubmitOffer={handleSubmitOffer}
          applications={applications}
          setActiveSection={setActiveSection}
        />
      ) : (
        <IntermediaryView
          activeSection={activeSection}
          t={t}
          applications={applications}
          logisticsApplications={logisticsApplications}
          updateApplicationStatus={updateApplicationStatus}
          updateLogisticsStatus={updateLogisticsStatus}
          setActiveSection={setActiveSection}
        />
      )}
    </DashboardLayout>
  )
}

export default App
