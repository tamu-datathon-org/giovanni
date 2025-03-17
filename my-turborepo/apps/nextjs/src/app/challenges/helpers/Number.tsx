import React from "react";
import PropTypes from "prop-types";

interface NumberedItemProps {
  number: number;
  text: string;
}

const NumberedItem: React.FC<NumberedItemProps> = ({ number, text }) => {
  return (
    <li style={{ marginBottom: "8px" }}>
      <span style={{ fontWeight: "bold", marginRight: "8px" }}>{number}.</span>
      {text}
    </li>
  );
};

NumberedItem.propTypes = {
  number: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

interface CustomNumberedListProps {
  items: string[];
  startFrom?: number;
}

const CustomNumberedList: React.FC<CustomNumberedListProps> = ({
  items,
  startFrom = 1,
}) => {
  return (
    <ol style={{ listStyleType: "none", padding: 0, margin: 0 }}>
      {items.map((item, index) => (
        <NumberedItem key={index} number={startFrom + index} text={item} />
      ))}
    </ol>
  );
};

CustomNumberedList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  startFrom: PropTypes.number,
};

CustomNumberedList.defaultProps = {
  startFrom: 1,
};

export default CustomNumberedList;
