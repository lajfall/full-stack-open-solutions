const TogglePanel = ({ children, showContent, setShowContent }) => {
  return (
    <div>
      <button
        data-testid="show-new-blog-form"
        style={{ display: showContent ? 'none' : 'initial' }}
        onClick={() => setShowContent(true)}
      >
        new blog
      </button>
      <div style={{ display: showContent ? 'initial' : 'none' }}>
        {children}
        <br />
        <button onClick={() => setShowContent(false)}>cancel</button>
      </div>
    </div>
  )
}

export default TogglePanel
