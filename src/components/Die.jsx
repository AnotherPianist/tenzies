export default function Die({ value, locked, lock }) {
  const styles = { backgroundColor: locked ? "#59E391" : "white" };

  return (
    <div className="die-face" onClick={lock} style={styles}>
      <h2 className="die-num">{value}</h2>
    </div>
  );
}
