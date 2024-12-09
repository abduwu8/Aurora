

const CircleLayout = ({ size = 70 }) => {
  // Define the color shades
  const colors = ['#a07a5d', '#9c775a', '#a18456', '#9e7754', '#a07a5d', '#a18456', '#a07a5d', '#a18456', '#a07a5d'];

  return (
    <div className="circle-layout">
      {colors.map((color, index) => (
        <div
          key={index}
          className="circle"
          style={{
            width: size,
            height: size,
            backgroundColor: color
          }}
        />
      ))}

      <style jsx>{`
        .circle-layout {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 2px;
        }

        .circle {
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default CircleLayout;