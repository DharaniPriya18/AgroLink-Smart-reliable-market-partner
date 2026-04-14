import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'

function DashboardLayout({
  themeClass,
  sidebar,
  topbar,
  children,
}) {
  return (
    <div className={`dashboard-shell ${themeClass}`}>
      <Sidebar {...sidebar} />
      <main className="main-area fade-in">
        <Topbar {...topbar} />
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
