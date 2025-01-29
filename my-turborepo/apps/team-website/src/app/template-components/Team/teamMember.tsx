import React from 'react';

// Define the type for the props
interface OrganizerCardProps {
  imageUrl: string;
  name: string;
  position: string;
}

const OrganizerCard: React.FC<OrganizerCardProps> = ({ imageUrl, name, position }) => {
  return (
    <div style={styles.card}>
      <img src={imageUrl} alt={name} style={styles.image} />
      <h3 style={styles.name}>{name}</h3>
      <p style={styles.position}>{position}</p>
    </div>
  );
};

// Define the styles with proper TypeScript types
const styles: { [key: string]: React.CSSProperties } = {
  card: {
    width: '200px',
    textAlign: 'center',
    margin: '10px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  name: {
    margin: '10px 0 5px 0',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  position: {
    margin: '0',
    fontSize: '14px',
    color: '#555',
  },
};

export default OrganizerCard;