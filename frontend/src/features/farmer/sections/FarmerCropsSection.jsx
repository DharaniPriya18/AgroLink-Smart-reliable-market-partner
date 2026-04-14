import Panel from '../../../components/ui/Panel.jsx'

function FarmerCropsSection({ t, cropForm, setCropForm, farmerCrops, handleAddCrop }) {
  return (
    <Panel title={t.myCrops} accent={`${farmerCrops.length} crops`} className="section-screen">
      <div className="full-section-grid">

        {/* ── Left: Add form ── */}
        <div className="full-section-main">
          <div className="section-block-label">Add New Crop</div>
          <form className="crop-add-form" onSubmit={handleAddCrop}>
            <input
              value={cropForm.crop}
              onChange={e => setCropForm(c => ({ ...c, crop: e.target.value }))}
              placeholder={t.cropName}
            />
            <input
              type="number"
              value={cropForm.quantity}
              onChange={e => setCropForm(c => ({ ...c, quantity: e.target.value }))}
              placeholder={t.quantity}
            />
            <input
              value={cropForm.district}
              onChange={e => setCropForm(c => ({ ...c, district: e.target.value }))}
              placeholder={t.district}
            />
            <button className="primary-button farmer-button crop-submit-btn" type="submit">
              {t.addCrop}
            </button>
          </form>
        </div>

        {/* ── Right: Crop inventory ── */}
        <div className="full-section-side">
          <div className="section-block-label">Your Inventory</div>
          {farmerCrops.length === 0 ? (
            <p className="helper-text">No crops added yet. Use the form to add your first crop.</p>
          ) : (
            <div className="crop-inventory-grid">
              {farmerCrops.map(item => (
                <article className="crop-inventory-card" key={item.id}>
                  <div className="crop-inv-icon">🌾</div>
                  <div className="crop-inv-body">
                    <strong>{item.crop}</strong>
                    <span>{item.quantity} kg</span>
                    <small>{item.district}</small>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

      </div>
    </Panel>
  )
}

export default FarmerCropsSection
