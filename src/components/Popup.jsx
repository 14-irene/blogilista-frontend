const Popup = ({ text, color }) =>
  text === null ? null :
    <div style={{
      border: `2px ${color}`,
      borderRadius: '5px',
      borderStyle: 'solid',
      backgroundColor: '#f2f2f2',
      textAlign: 'center',
      fontStyle: 'italic',
      fontSize: 22,
      marginBottom: '5px',
      width: '250px' }}>
      {text}
    </div>
export default Popup
